module.exports = {
  ifeq(a, b, options) {
    if (a == b) {
      return options.fn(this)
    }
    return options.inverse(this)
  },

  addOne(value) {
    return value + 1;
  },
}
