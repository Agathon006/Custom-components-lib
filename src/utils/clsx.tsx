export function clsx(...args: (string | string[] | null | undefined | false)[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string' && arg) {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === 'string' && item) {
          classes.push(item);
        }
      }
    }
  }

  return classes.join(' ');
}
