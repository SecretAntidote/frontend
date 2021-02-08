function convertDollarsToRbx(offerPrice) {
  return Math.round(offerPrice * (65 / 1) * 0.5);
}

module.exports = {
  convertDollarsToRbx
};
