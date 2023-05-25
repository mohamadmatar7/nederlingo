/**
 * A module with some custom block helpers
 */

export default {
  bold: function (text) {
    return `<strong>${text}</strong>`;
  },
  ifEquals: function (arg1, arg2, options) {
    if (arg1 == arg2) {
      return options.fn(this);
    } else if (typeof options.inverse == "function") {
      return options.inverse(this);
    } else {
      return null;
    }
  },
};
