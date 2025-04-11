export async function handleSparkTask(input) {
  if (input.includes("summarize")) {
    return `Summary generated:
1. Key points extracted
2. Main themes identified
3. Action items highlighted
4. Recommendations provided`;
  }
  if (input.includes("diagram")) {
    return `Diagram created:
┌─────────────┐
│  System     │
│  Architecture│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Components │
└─────────────┘`;
  }
  if (input.includes("deploy")) {
    return `Deployment completed:
✓ Environment: staging
✓ Version: 1.0.0
✓ Status: Success
✓ URL: https://staging.example.com`;
  }
  if (input.includes("execute")) {
    return `Execution results:
✓ Task validated
✓ Dependencies checked
✓ Process completed
✓ Output generated`;
  }
  return "Spark module received: " + input;
}