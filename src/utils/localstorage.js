export const setLocStorage = (key, value) => {
  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
