export function excludeAttributes<T, K extends keyof T> (param: T, ...args: K[]) {
  const tempObj = {};
  for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(param)))) {
    if (!args.includes(key as K)) {
      tempObj[key] = value;
    }
  }
  return tempObj;
}
