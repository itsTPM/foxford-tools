type Proxied<T> = T & { readonly __isProxy?: true };

export function proxyToObject<T extends object>(obj: Proxied<T>) {
  return JSON.parse(JSON.stringify(obj));
}
