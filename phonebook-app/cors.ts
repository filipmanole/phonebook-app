type NextFunction = (error: Error, origin: string) => unknown;

export function setupCorsOrigin(origin: string, next: NextFunction): unknown {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return next(undefined, origin);
}
