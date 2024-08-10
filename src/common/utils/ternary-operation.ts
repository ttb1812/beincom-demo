export function ternaryOperator<T>(
  condition: boolean,
  valueIfTrue: T,
  valueIfFalse: T,
): T {
  if (condition) {
    return valueIfTrue;
  } else {
    return valueIfFalse;
  }
}
