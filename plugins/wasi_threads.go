package plugins

import (
	"context"
	"sync/atomic"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/api"
)

var threadIDCounter uint32

// InstantiateWASIThreads registers the "wasi" module with thread_spawn support
func InstantiateWASIThreads(ctx context.Context, r wazero.Runtime) error {
	_, err := r.NewHostModuleBuilder("wasi").
		NewFunctionBuilder().
		WithFunc(func(ctx context.Context, mod api.Module, startArg uint32) uint32 {
			// Generate a new thread ID
			tid := atomic.AddUint32(&threadIDCounter, 1)

			// Get the wasi_thread_start export from the module
			threadStart := mod.ExportedFunction("wasi_thread_start")
			if threadStart == nil {
				return 1 // Error: no wasi_thread_start export
			}

			// Spawn a goroutine to run the thread
			go func() {
				_, _ = threadStart.Call(ctx, uint64(tid), uint64(startArg))
			}()

			return 0 // Success
		}).
		Export("thread-spawn").
		Instantiate(ctx)

	return err
}