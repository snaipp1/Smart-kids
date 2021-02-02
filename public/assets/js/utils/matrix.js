export function makeMatrix(size, initValue = []) {
  const newArr = Array(size ** 2 - initValue.length).fill(0);
  return {
    store: initValue.concat(newArr),
    size,
  };
}

export function getCell(matrix, x, y) {
  const { store, size } = matrix;
  return store[x + y * size];
}

export function setCell(matrix, value, x, y) {
  const { store, size } = matrix;
  store[x + y * size] = value;
  return { store, size };
}

export function shuffleMatrix(matrix) {
  const { store, size } = matrix;
  store.sort(() => Math.random() - 0.5);
  return { store, size };
}
