export function productDetailPath(segments: string[]): string {
  return `/product/${segments.join("/")}`;
}
