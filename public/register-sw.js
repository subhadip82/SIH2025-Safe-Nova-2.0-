if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((err) => {
      // Registration failed
      // eslint-disable-next-line no-console
      console.warn('Service worker registration failed:', err)
    })
  })
}
