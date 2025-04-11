import { handleSpeech } from './voice.js';
import { respondFromAgent } from './agent.js';
import { logConversation } from './conversation-history.js';
import { containmentCheck, getIdentity } from './containment-core.js';
import { MasterControlProtocol } from './mcp.js';

// Initialize MCP
const mcp = new MasterControlProtocol();

// Initialize identity status
async function initializeIdentity() {
  try {
    const identity = await getIdentity();
    document.getElementById('identity-status').innerText = "Role: " + identity;
    
    // Initialize MCP
    const mcpStatus = await mcp.initialize();
    console.log(mcpStatus);
  } catch (error) {
    console.error('Error initializing identity:', error);
    document.getElementById('identity-status').innerText = 'Role: Error';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeIdentity);

document.getElementById('start').onclick = async () => {
  try {
    // Update task status
    document.getElementById('task-output').innerText = 'Processing voice input...';
    document.getElementById('task-result-output').innerText = 'No results yet';
    
    const userText = await handleSpeech();
    document.getElementById('output').innerText = userText;

    // Containment layer check
    const containmentMsg = containmentCheck(userText);
    console.log(containmentMsg);
    
    // Process command through MCP
    const mcpStatus = mcp.getStatus();
    if (!mcpStatus.isActive) {
      throw new Error('MCP is not active');
    }

    // Update task status
    document.getElementById('task-output').innerText = 'Generating response...';

    // Process command through MCP
    const mcpResult = await mcp.processCommand(userText);
    console.log('MCP Result:', mcpResult);

    const response = await respondFromAgent(userText);

    // Log the interaction
    logConversation(userText, response);

    // Update task status and display result
    document.getElementById('task-output').innerText = 'Speaking response...';
    document.getElementById('task-result-output').innerText = response;

    // Speak and display response
    speak(response);
    
    // Reset task status
    document.getElementById('task-output').innerText = 'No task running';
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('output').innerText = 'An error occurred. Please try again.';
    document.getElementById('task-output').innerText = 'Error: ' + error.message;
    document.getElementById('task-result-output').innerText = 'Error: ' + error.message;
  }
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utter);
}

// Handle page unload
window.addEventListener('beforeunload', async () => {
  await mcp.shutdown();
});