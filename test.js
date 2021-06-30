// test file for eslint rules

function main(hi) {
  // require double equals null
  // eslint-disable-next-line @foxglove/strict-equality
  if (hi === null) {
    return;
  }
  if (hi == null) {
    return;
  }

  // require double equals undefined
  // eslint-disable-next-line @foxglove/strict-equality
  if (hi === undefined) {
    return;
  }
  if (hi == undefined) {
    return;
  }

  // require triple equals elsewhere
  // eslint-disable-next-line @foxglove/strict-equality
  if (hi == 5) {
    return;
  }
  if (hi === 5) {
    return;
  }
}

export default main;
