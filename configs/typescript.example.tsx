// Use --report-unused-disable-directives to validate errors

/* eslint-disable @typescript-eslint/no-unused-expressions */

void (async () => {
  await 1; // eslint-disable-line @typescript-eslint/await-thenable
  await (function () {})(); // eslint-disable-line @typescript-eslint/await-thenable, @typescript-eslint/no-empty-function, @typescript-eslint/no-confusing-void-expression
  await (async function () {})(); // eslint-disable-line @typescript-eslint/no-empty-function
})();

(
  str: string,
  num: number,
  wut: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  maybeStr?: string,
  maybeNum?: number,
  maybeObj?: Record<string, unknown>
) => {
  // strict boolean checks are required for everything except strings
  str ? 0 : 1; // allowed
  maybeStr ? 0 : 1; // allowed
  num ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  num == 0 ? 0 : 1; // eslint-disable-line @foxglove/strict-equality
  num === 0 ? 0 : 1; // allowed
  maybeNum ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  maybeObj ? 0 : 1; // allowed
  wut ? 0 : 1; // eslint-disable-line @typescript-eslint/strict-boolean-expressions
  wut == null ? 0 : 1; // allowed
};

void undefined; // eslint-disable-line @typescript-eslint/no-meaningless-void-operator

/* eslint-enable @typescript-eslint/no-unused-expressions */
42; // eslint-disable-line @typescript-eslint/no-unused-expressions
<></>; // eslint-disable-line @typescript-eslint/no-unused-expressions

class C {
  private x = 1; // eslint-disable-line @foxglove/prefer-hash-private
  constructor() {
    void this.x;
  }
}
void C;

// keep isolatedModules happy
export default {};
