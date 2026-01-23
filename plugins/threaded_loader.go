package plugins

import (
	"context"
	"fmt"

	"github.com/tetratelabs/wazero"
	"github.com/tetratelabs/wazero/api"
	"github.com/tetratelabs/wazero/experimental"
	"github.com/tetratelabs/wazero/imports/wasi_snapshot_preview1"
)

// LoadThreadedPlugin loads a WASM plugin that requires thread support
// This bypasses Extism and uses wazero directly
func (m *Manager) loadThreadedPlugin(ctx context.Context, wasmBytes []byte, pluginID string) error {
	// Create runtime with thread support
	runtimeConfig := wazero.NewRuntimeConfig().
		WithCoreFeatures(api.CoreFeaturesV2 | experimental.CoreFeaturesThreads).
		WithCompilationCache(m.cache)
	
	r := wazero.NewRuntimeWithConfig(ctx, runtimeConfig)
	
	// Instantiate WASI snapshot preview1 (standard WASI)
	wasi_snapshot_preview1.MustInstantiate(ctx, r)
	
	// Instantiate our custom WASI threads module
	wasiThreads, err := NewWASIThreadsModule(ctx, r)
	if err != nil {
		r.Close(ctx)
		return fmt.Errorf("creating WASI threads module: %w", err)
	}
	
	// Register any other host functions your plugin needs
	// (You'd need to re-implement Extism's host functions here)
	err = registerNavidromeHostFunctions(ctx, r, pluginID, m)
	if err != nil {
		r.Close(ctx)
		return fmt.Errorf("registering host functions: %w", err)
	}
	
	// Compile and instantiate the main module
	compiled, err := r.CompileModule(ctx, wasmBytes)
	if err != nil {
		r.Close(ctx)
		return fmt.Errorf("compiling module: %w", err)
	}
	
	// Configure module (shared memory, etc.)
	moduleConfig := wazero.NewModuleConfig().
		WithName("main").
		WithStartFunctions() // Don't auto-call _start
	
	mod, err := r.InstantiateModule(ctx, compiled, moduleConfig)
	if err != nil {
		r.Close(ctx)
		return fmt.Errorf("instantiating module: %w", err)
	}
	
	// Set the module reference so thread-spawn can call wasi_thread_start
	wasiThreads.SetModule(mod)
	
	// Store the plugin
	m.mu.Lock()
	m.plugins[pluginID] = &threadedPlugin{
		runtime:     r,
		module:      mod,
		wasiThreads: wasiThreads,
	}
	m.mu.Unlock()
	
	return nil
}