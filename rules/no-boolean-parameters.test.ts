// Use --report-unused-disable-directives to validate errors

/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */

void function foo(
  _a: boolean, // eslint-disable-line @foxglove/no-boolean-parameters
  _b: boolean = false, // eslint-disable-line @foxglove/no-boolean-parameters
  _c = true, // eslint-disable-line @foxglove/no-boolean-parameters
  _d?: false, // eslint-disable-line @foxglove/no-boolean-parameters
  _e?: boolean | number, // ok
  _f: boolean | undefined = false // eslint-disable-line @foxglove/no-boolean-parameters
) {};

// eslint-disable-next-line @foxglove/no-boolean-parameters
void ((_a: boolean) => {});

type B = boolean;
void {
  foo(
    _a: B, // eslint-disable-line @foxglove/no-boolean-parameters
    _b?: B | undefined, // eslint-disable-line @foxglove/no-boolean-parameters
    _c: B | undefined = false // eslint-disable-line @foxglove/no-boolean-parameters
  ) {},
};

// Warnings appear only when types are explicitly annotated
function acceptsFoo(
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  _: (_a: boolean) => void
) {}
acceptsFoo((_a) => {}); // ok

void class C {
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  foo(_a: boolean | undefined) {}
};

// keep isolatedModules happy
export default {};
