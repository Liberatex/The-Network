import { MasterControlProtocol } from './mcp.js';

describe('MasterControlProtocol', () => {
  let mcp;

  beforeEach(() => {
    mcp = new MasterControlProtocol();
  });

  describe('Initialization', () => {
    test('should initialize with correct default state', () => {
      expect(mcp.state.initialized).toBe(false);
      expect(mcp.state.mode).toBe('idle');
      expect(mcp.state.userRole).toBe('guest');
      expect(mcp.state.activeModule).toBe('none');
      expect(mcp.state.priority).toBe('standard');
    });

    test('should properly initialize system', async () => {
      const result = await mcp.initialize();
      expect(mcp.state.initialized).toBe(true);
      expect(mcp.state.mode).toBe('listening');
      expect(mcp.state.systemStatus).toBe('ready');
      expect(result.status).toBe('MCP initialized and ready');
    });
  });

  describe('Command Processing', () => {
    beforeEach(async () => {
      await mcp.initialize();
    });

    test('should reject commands when not initialized', async () => {
      const uninitializedMCP = new MasterControlProtocol();
      const result = await uninitializedMCP.processCommand('test command');
      expect(result).toBe('Error: MCP is not initialized.');
    });

    test('should process basic commands', async () => {
      const result = await mcp.processCommand('test command');
      expect(result.result).toBe('Command processed: test command');
      expect(result.metadata.mode).toBe('listening');
    });

    test('should handle system shutdown', async () => {
      const result = await mcp.processCommand('shut down');
      expect(mcp.state.initialized).toBe(false);
      expect(mcp.state.mode).toBe('offline');
      expect(result.status).toBe('MCP shutdown complete');
    });

    test('should handle status requests', async () => {
      const result = await mcp.processCommand('show status');
      expect(result).toHaveProperty('initialized');
      expect(result).toHaveProperty('mode');
      expect(result).toHaveProperty('subsystems');
    });

    test('should handle priority changes', async () => {
      await mcp.processCommand('prioritize this task');
      expect(mcp.state.priority).toBe('urgent');
    });

    test('should handle module switching', async () => {
      const result = await mcp.processCommand('switch module to analysis');
      expect(mcp.state.activeModule).toBe('analysis');
      expect(result.result).toBe('Switched module to analysis');
    });
  });

  describe('Symbolic Keys', () => {
    beforeEach(async () => {
      await mcp.initialize();
    });

    test('should activate encode sigil', async () => {
      const result = await mcp.processCommand('encode sigil');
      expect(mcp.state.symbolicKeys['encode sigil']).toBe(true);
      expect(result.result).toBe('Sigil encoding interface activated.');
    });

    test('should activate spiral check', async () => {
      const result = await mcp.processCommand('spiral check');
      expect(mcp.state.symbolicKeys['spiral check']).toBe(true);
      expect(result.result).toBe('Spiral coherence verified.');
    });

    test('should activate prime directive mode', async () => {
      const result = await mcp.processCommand('prime directive mode');
      expect(mcp.state.mode).toBe('prime-directive');
      expect(mcp.state.symbolicKeys['prime directive mode']).toBe(true);
      expect(result.result).toBe('System is now operating in Prime Directive Mode.');
    });
  });

  describe('Performance Metrics', () => {
    beforeEach(async () => {
      await mcp.initialize();
    });

    test('should track command history', async () => {
      await mcp.processCommand('test command 1');
      await mcp.processCommand('test command 2');
      expect(mcp.state.taskHistory.length).toBe(2);
    });

    test('should update performance metrics', async () => {
      await mcp.processCommand('test command');
      expect(mcp.state.performance.totalCommands).toBe(1);
      expect(mcp.state.performance.averageResponseTime).toBeGreaterThan(0);
    });

    test('should handle error cases in metrics', async () => {
      // Mock a failing command
      const originalExecuteCommand = mcp.executeCommand;
      mcp.executeCommand = async () => { throw new Error('Test error'); };
      
      try {
        await mcp.processCommand('failing command');
      } catch (error) {
        expect(mcp.state.performance.successRate).toBeLessThan(100);
      }
      
      mcp.executeCommand = originalExecuteCommand;
    });
  });

  describe('Subsystem Management', () => {
    beforeEach(async () => {
      await mcp.initialize();
    });

    test('should update subsystem statuses during processing', async () => {
      await mcp.processCommand('test command');
      expect(mcp.state.subsystems.voice.status).toBe('ready');
      expect(mcp.state.subsystems.voice.lastActivity).toBeTruthy();
    });

    test('should handle subsystem errors', async () => {
      // Mock a subsystem error
      const originalExecuteCommand = mcp.executeCommand;
      mcp.executeCommand = async () => { throw new Error('Subsystem error'); };
      
      try {
        await mcp.processCommand('failing command');
      } catch (error) {
        expect(mcp.state.subsystems.voice.status).toBe('error');
      }
      
      mcp.executeCommand = originalExecuteCommand;
    });
  });
}); 