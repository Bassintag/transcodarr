export async function orThrow<T>(promise: Promise<T | undefined>) {
  const value = await promise;
  if (value == null) throw new Error("No value");
  return value;
}
