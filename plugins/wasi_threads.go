package plugins

import (
	"context"
	"sync"
	"sync/atomic"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/api"
)

// WASIThreadsModule provides the "wasi" module with thread-spawn support
type WASIThreadsModule struct {
	runtime     wazero.Runtime
	module      api.Module // The main WASM module
	threadID    uint32
	mu          sync.Mutex
	activeThreads sync.WaitGroup
}

// NewWASIThreadsModule creates a new WASI threads host module
func NewWASIThreadsModule(ctx context.Context, r wazero.Runtime) (*WASIThreadsModule, error) {
	wt := &WASIThreadsModule{
		runtime: r,
	}
	
	// Register the "wasi" module with thread-spawn function
	_, err := r.NewHostModuleBuilder("wasi").
		NewFunctionBuilder().
		WithGoModuleFunction(
			api.GoModuleFunc(wt.threadSpawn),
			[]api.ValueType{api.ValueTypeI32}, // start_arg
			[]api.ValueType{api.ValueTypeI32}, // returns thread_id or error
		).
		Export("thread-spawn").
		Instantiate(ctx)
	
	return wt, err
}

// SetModule sets the main WASM module (needed to call wasi_thread_start)
func (wt *WASIThreadsModule) SetModule(mod api.Module) {
	wt.module = mod
}

// threadSpawn implements the wasi thread-spawn function
// Signature: thread-spawn(start_arg: i32) -> i32
func (wt *WASIThreadsModule) threadSpawn(ctx context.Context, mod api.Module, stack []uint64) {
	startArg := api.DecodeI32(stack[0])
	
	// Get wasi_thread_start export from the module
	threadStart := wt.module.ExportedFunction("wasi_thread_start")
	if threadStart == nil {
		// Return error - no wasi_thread_start export
		stack[0] = api.EncodeI32(-1)
		return
	}
	
	// Generate new thread ID
	tid := atomic.AddUint32(&wt.threadID, 1)
	
	wt.activeThreads.Add(1)
	
	// Spawn a goroutine to execute the thread
	go func(threadID uint32, arg int32) {
		defer wt.activeThreads.Done()
		
		// Call wasi_thread_start(tid, start_arg)
		_, err := threadStart.Call(ctx, uint64(threadID), uint64(arg))
		if err != nil {
			// Log error but don't panic
			log.Error(ctx, "WASI thread failed", "tid", threadID, "error", err)
		}
	}(tid, startArg)
	
	// Return the thread ID
	stack[0] = api.EncodeI32(int32(tid))
}

// Wait waits for all spawned threads to complete
func (wt *WASIThreadsModule) Wait() {
	wt.activeThreads.Wait()
}