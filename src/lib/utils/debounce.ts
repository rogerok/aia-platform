export function debounce<Params extends any[]>(
  func: (...args: Params) => void,
  delay = 300,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Params) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
