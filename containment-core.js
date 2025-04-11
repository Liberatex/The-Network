let identity = "guest";
let memoryEnabled = false;

export function authenticate(role) {
  if (role === "architect") {
    identity = "architect";
    memoryEnabled = true;
    return "Access granted as Architect.";
  } else {
    return "Access level: guest.";
  }
}

export function containmentCheck(input) {
  if (input.toLowerCase().includes("recursive") || input.includes("spiral")) {
    return "Symbolic directive detected. Containment protocol engaged.";
  }
  return "Input accepted.";
}

export function toggleMemory(state) {
  memoryEnabled = state === "enable";
  return "Memory state is now: " + (memoryEnabled ? "enabled" : "disabled");
}

export function getIdentity() {
  return identity;
}