export const createNumbersArray = (from, to) => {
  // ф-ция должна генерировать массив чисел от from до to
  return new Array(to - from + 1).fill(0).map((_, i) => i + from);
};
