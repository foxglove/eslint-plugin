// Use --report-unused-disable-directives to validate errors
/* eslint-disable no-unused-expressions */

(x) => {
  // require double equals for null and undefined
  x === null; // eslint-disable-line @foxglove/strict-equality
  x !== null; // eslint-disable-line @foxglove/strict-equality
  x == null;
  x != null;
  x === undefined; // eslint-disable-line @foxglove/strict-equality
  x !== undefined; // eslint-disable-line @foxglove/strict-equality
  x == undefined;
  x != undefined;

  // require triple equals elsewhere
  x === 5;
  x !== 5;
  x == 5; // eslint-disable-line @foxglove/strict-equality
  x != 5; // eslint-disable-line @foxglove/strict-equality
};
