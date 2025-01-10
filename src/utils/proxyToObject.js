export function proxyToObject(proxy) {
  return JSON.parse(JSON.stringify(proxy));
}
