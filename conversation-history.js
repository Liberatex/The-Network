let historyLog = [];

export function logConversation(input, output) {
  historyLog.push({ input, output, timestamp: new Date() });
  console.log("Conversation History Updated:", historyLog);
}

export function getConversationHistory() {
  return historyLog;
}