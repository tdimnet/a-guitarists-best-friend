function numberRange(start, stop, step) {
  return Array.from(
    {
      length: (stop - start) / step + 1,
    },
    (value, index) => start + index * step
  );
}

export { numberRange };
