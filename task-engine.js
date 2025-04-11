let currentTask = null;

export function runTask(name, data) {
  currentTask = {
    name,
    data,
    status: "running",
    started: new Date()
  };
  console.log("Task started:", currentTask);

  // Simulated delay and response
  setTimeout(() => {
    currentTask.status = "completed";
    currentTask.result = "Simulated output for task: " + name;
    currentTask.completed = new Date();
    console.log("Task completed:", currentTask);
  }, 2000);
}

export function getTaskStatus() {
  return currentTask || { status: "idle" };
}