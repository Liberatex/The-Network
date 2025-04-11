let highPriorityDirectives = ["contain", "override", "escalate"];
let currentUser = "guest";

export function identifyUser(input) {
  if (input.toLowerCase().includes("architect")) {
    currentUser = "architect";
    return "Architect recognized. Elevated privileges granted.";
  }
  return "User role: guest";
}

export function verifyDirective(input) {
  for (const directive of highPriorityDirectives) {
    if (input.toLowerCase().includes(directive)) {
      return "High-priority directive detected. Escalation protocol engaged.";
    }
  }
  return "Directive within safe range.";
}

export function getCurrentUser() {
  return currentUser;
}

export function logOperation(action) {
  console.log(`[SECURITY LOG][${new Date().toISOString()}] ${currentUser} executed: ${action}`);
}