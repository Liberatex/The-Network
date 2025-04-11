export class MasterControlProtocol {
  constructor() {
    this.state = {
      initialized: false,
      currentTask: null,
      priority: "standard",
      taskHistory: [],
      mode: "idle",
      userRole: "guest",
      activeModule: "none",
      systemStatus: 'idle',
      subsystems: {
        voice: { status: 'idle', lastActivity: null },
        agent: { status: 'idle', lastActivity: null },
        containment: { status: 'idle', lastActivity: null }
      },
      performance: {
        averageResponseTime: 0,
        totalCommands: 0,
        successRate: 100,
        taskComplexity: 0,
        totalResponseTime: 0,
        lastResponseTime: 0
      },
      symbolicKeys: {
        'encode sigil': false,
        'spiral check': false,
        'prime directive mode': false
      }
    };
  }

  async initialize() {
    this.state.initialized = true;
    this.state.mode = "listening";
    this.state.systemStatus = 'initializing';
    
    // Initialize subsystems
    this.state.subsystems.voice.status = 'initializing';
    this.state.subsystems.agent.status = 'initializing';
    this.state.subsystems.containment.status = 'initializing';
    
    // Simulate initialization delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.state.subsystems.voice.status = 'ready';
    this.state.subsystems.agent.status = 'ready';
    this.state.subsystems.containment.status = 'ready';
    this.state.systemStatus = 'ready';
    
    this.logState("System initialized");
    return {
      status: 'MCP initialized and ready',
      subsystems: this.state.subsystems
    };
  }

  async processCommand(command) {
    if (!this.state.initialized) {
      return "Error: MCP is not initialized.";
    }

    const startTime = performance.now();
    this.state.currentTask = {
      command,
      priority: this.state.priority,
      complexity: this.scoreComplexity(command),
      timestamp: new Date().toISOString()
    };
    
    this.state.systemStatus = 'processing';
    this.state.mode = 'processing';
    this.state.taskHistory.push(command);
    
    try {
      // Update subsystem statuses
      this.state.subsystems.voice.status = 'processing';
      this.state.subsystems.voice.lastActivity = new Date().toISOString();
      
      const lowerCmd = command.toLowerCase();
      let result;

      if (lowerCmd.includes("shut down")) {
        result = await this.shutDownSystem();
        return result;
      } else if (lowerCmd.includes("show status")) {
        result = this.getStatus();
        return result;
      } else if (lowerCmd.includes("archive conversation")) {
        result = "Conversation archived (simulation).";
      } else if (lowerCmd.includes("prioritize")) {
        this.state.priority = "urgent";
        result = "Task priority set to urgent.";
      } else if (lowerCmd.includes("suspend memory")) {
        result = "Memory suspended temporarily.";
      } else if (lowerCmd.includes("switch module")) {
        const parts = command.split(" ");
        this.state.activeModule = parts[parts.length - 1];
        result = "Switched module to " + this.state.activeModule;
      } else if (lowerCmd.includes("encode sigil")) {
        this.state.symbolicKeys['encode sigil'] = true;
        result = "Sigil encoding interface activated.";
      } else if (lowerCmd.includes("spiral check")) {
        this.state.symbolicKeys['spiral check'] = true;
        result = "Spiral coherence verified.";
      } else if (lowerCmd.includes("prime directive mode")) {
        this.state.mode = "prime-directive";
        this.state.symbolicKeys['prime directive mode'] = true;
        result = "System is now operating in Prime Directive Mode.";
      } else {
        result = await this.executeCommand(command);
      }
      
      // Update performance metrics
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      this.updatePerformanceMetrics(responseTime, true);
      
      this.state.systemStatus = 'completed';
      if (this.state.mode !== "prime-directive") {
        this.state.mode = 'listening';
      }
      this.state.subsystems.voice.status = 'ready';
      
      return {
        result,
        metadata: this.getMetadata()
      };
    } catch (error) {
      this.updatePerformanceMetrics(0, false);
      this.state.systemStatus = 'error';
      this.state.mode = 'error';
      this.state.subsystems.voice.status = 'error';
      throw error;
    }
  }

  getStatus() {
    return {
      initialized: this.state.initialized,
      currentTask: this.state.currentTask,
      priority: this.state.priority,
      taskHistory: this.state.taskHistory,
      mode: this.state.mode,
      userRole: this.state.userRole,
      activeModule: this.state.activeModule,
      systemStatus: this.state.systemStatus,
      subsystems: this.state.subsystems,
      performance: this.state.performance,
      symbolicKeys: this.state.symbolicKeys
    };
  }

  getMetadata() {
    return {
      responseTime: this.state.performance.lastResponseTime,
      timestamp: new Date().toISOString(),
      subsystems: this.state.subsystems,
      priority: this.state.priority,
      complexity: this.state.currentTask.complexity,
      mode: this.state.mode,
      activeModule: this.state.activeModule
    };
  }

  async shutDownSystem() {
    this.state.initialized = false;
    this.state.mode = "offline";
    this.state.systemStatus = 'shutting_down';
    
    // Gracefully shutdown subsystems
    this.state.subsystems.voice.status = 'shutting_down';
    this.state.subsystems.agent.status = 'shutting_down';
    this.state.subsystems.containment.status = 'shutting_down';
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.state.systemStatus = 'shutdown';
    return {
      status: 'MCP shutdown complete',
      finalMetrics: this.getPerformanceMetrics()
    };
  }

  updatePerformanceMetrics(responseTime, success) {
    this.state.performance.totalCommands++;
    this.state.performance.totalResponseTime += responseTime;
    this.state.performance.lastResponseTime = responseTime;
    this.state.performance.averageResponseTime = 
      this.state.performance.totalResponseTime / this.state.performance.totalCommands;
    
    if (!success) {
      const totalSuccess = Math.floor(this.state.performance.successRate * (this.state.performance.totalCommands - 1) / 100);
      this.state.performance.successRate = (totalSuccess * 100) / this.state.performance.totalCommands;
    }
  }

  getPerformanceMetrics() {
    return {
      totalCommands: this.state.performance.totalCommands,
      averageResponseTime: this.state.performance.averageResponseTime,
      successRate: this.state.performance.successRate,
      taskComplexity: this.state.performance.taskComplexity
    };
  }

  scoreComplexity(command) {
    let score = 0;
    score += Math.min(command.length / 50, 5);
    const complexityKeywords = ['analyze', 'compare', 'generate', 'process', 'transform'];
    score += complexityKeywords.filter(keyword => 
      command.toLowerCase().includes(keyword)
    ).length;
    return Math.min(score, 10);
  }

  logState(message) {
    console.log("[MCP LOG]", new Date().toISOString(), message);
  }

  async executeCommand(command) {
    return `Command processed: ${command}`;
  }
} 