// Use --report-unused-disable-directives to validate errors

void (async () => {
  // noop
})();

// eslint-disable-next-line @foxglove/no-meaningless-void-operator
void (() => {
  // noop
})();

function foo(): void {
  // noop
}
function bar(): undefined {
  return undefined;
}
function baz(): number {
  return 2;
}
function maybeBaz(): number | undefined {
  return 2;
}
function maybeNothing(): void | undefined {
  return;
}
function exit(): never {
  throw new Error();
}

void foo(); // eslint-disable-line @foxglove/no-meaningless-void-operator
void bar(); // eslint-disable-line @foxglove/no-meaningless-void-operator
void baz();
void void baz(); // eslint-disable-line @foxglove/no-meaningless-void-operator
void maybeBaz();
void void maybeBaz(); // eslint-disable-line @foxglove/no-meaningless-void-operator
void maybeNothing(); // eslint-disable-line @foxglove/no-meaningless-void-operator
void exit(); // eslint-disable-line @foxglove/no-meaningless-void-operator

// keep isolatedModules happy
export default {};
