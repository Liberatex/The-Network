export async function handleCursorTask(input) {
  if (input.includes("button")) {
    return `<button class="btn-primary" onclick="handleClick()">
  <span class="btn-text">Click Me</span>
  <span class="btn-icon">→</span>
</button>

<style>
.btn-primary {
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: var(--secondary-color);
}
</style>`;
  }
  if (input.includes("navigation")) {
    return `<nav class="main-nav">
  <ul class="nav-list">
    <li class="nav-item"><a href="/">Home</a></li>
    <li class="nav-item"><a href="/about">About</a></li>
    <li class="nav-item"><a href="/contact">Contact</a></li>
  </ul>
</nav>

<style>
.main-nav {
  background: var(--background-color);
  padding: 1rem;
}

.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-item a:hover {
  color: var(--primary-color);
}
</style>`;
  }
  if (input.includes("theme")) {
    return `:root {
  /* Primary Colors */
  --primary-color: #2563eb;
  --primary-light: #3b82f6;
  --primary-dark: #1e40af;

  /* Secondary Colors */
  --secondary-color: #10b981;
  --secondary-light: #34d399;
  --secondary-dark: #059669;

  /* Neutral Colors */
  --background-color: #f8fafc;
  --surface-color: #ffffff;
  --text-color: #1e293b;
  --text-light: #64748b;

  /* Semantic Colors */
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  --info-color: #3b82f6;
}`;
  }
  if (input.includes("responsive")) {
    return `/* Base styles */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

/* Tablet and larger */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
  
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`;
  }
  return "Cursor logic placeholder: " + input;
}