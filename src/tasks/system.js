export async function handleSystemTask(input) {
  if (input.includes("system") || input.includes("info") || input.includes("status")) {
    const systemInfo = {
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      language: navigator.language,
      online: navigator.onLine,
      memory: navigator.deviceMemory,
      cores: navigator.hardwareConcurrency
    };

    return `System Information:
    - Platform: ${systemInfo.platform}
    - Browser: ${systemInfo.userAgent.split(' ')[0]}
    - Language: ${systemInfo.language}
    - Online Status: ${systemInfo.online ? 'Connected' : 'Offline'}
    - Memory: ${systemInfo.memory ? systemInfo.memory + 'GB' : 'Unknown'}
    - CPU Cores: ${systemInfo.cores || 'Unknown'}`;
  }
  return null;
} 