let moduleContext = {
  currentModule: null,
  lastInput: null,
  lastResponse: null,
  userRole: "guest"
};

export function updateContext(moduleName, input, response) {
  moduleContext.currentModule = moduleName;
  moduleContext.lastInput = input;
  moduleContext.lastResponse = response;
  console.log("Context Updated:", moduleContext);
}

export function getContext() {
  return moduleContext;
}

export function setUserRole(role) {
  moduleContext.userRole = role;
}

export function getUserRole() {
  return moduleContext.userRole;
}