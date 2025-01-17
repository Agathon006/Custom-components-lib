type ClassNames = { [key: string]: boolean };

function makeClassName(...args: (string | ClassNames | string[] | null | undefined)[]): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (typeof arg === 'string' && arg) {
      classes.push(arg);
    } else if (typeof arg === 'object' && arg !== null && !Array.isArray(arg)) {
      for (const key in arg) {
        if (Object.prototype.hasOwnProperty.call(arg, key) && arg[key] === true) {
          classes.push(key);
        }
      }
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

export default makeClassName;
