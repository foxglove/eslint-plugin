// Use --report-unused-disable-directives to validate errors

/* eslint-disable @typescript-eslint/no-unused-expressions */

void (async () => {
  await 1; // eslint-disable-line @typescript-eslint/await-thenable
  await (function () {})(); // eslint-disable-line @typescript-eslint/await-thenable, @typescript-eslint/no-empty-function
  await (async function () {})(); // eslint-disable-line @typescript-eslint/no-empty-function
})();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(str: string, num: number, wut: any, maybeStr?: string, maybeNum?: number) => {
  // strict boolean checks are required for everything except strings
  str ? 0 : 1; // allowed
  maybeStr ? 0 : 1; // allowed
  num ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  num == 0 ? 0 : 1; // eslint-disable-line @foxglove/strict-equality
  num === 0 ? 0 : 1; // correct
  maybeNum ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  wut ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  wut == null ? 0 : 1;
};

// keep isolatedModules happy
export default {};
