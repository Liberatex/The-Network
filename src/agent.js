import { handleSparkTask } from './tasks/spark.js';
import { handleCursorTask } from './tasks/cursor.js';
import { handleManusTask } from './tasks/manus.js';
import { handleSystemTask } from './tasks/system.js';

export async function respondFromAgent(input) {
  // Try system tasks first
  const systemResponse = await handleSystemTask(input);
  if (systemResponse) return systemResponse;

  // Then try other specific tasks
  if (input.includes("deploy") || input.includes("execute")) return await handleSparkTask(input);
  if (input.includes("code") || input.includes("build")) return await handleCursorTask(input);
  if (input.includes("app") || input.includes("create")) return await handleManusTask(input);

  // Default response for unmapped directives
  return "I understand you're speaking, but I need more specific instructions. Try asking about system information, deployment, coding, or app creation.";
}