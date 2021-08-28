// Use --report-unused-disable-directives to validate errors

/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-empty-function */

void function foo(
  _a: boolean, // eslint-disable-line @foxglove/no-boolean-parameters
  _b: boolean | undefined, // eslint-disable-line @foxglove/no-boolean-parameters
  _c: boolean = false, // eslint-disable-line @foxglove/no-boolean-parameters
  _d = true, // eslint-disable-line @foxglove/no-boolean-parameters
  _e?: false, // eslint-disable-line @foxglove/no-boolean-parameters
  _f?: boolean | number, // ok
  _g: boolean | undefined = false // eslint-disable-line @foxglove/no-boolean-parameters
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

abstract class D {
  // TSAbstractMethodDefinition
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  abstract foo(_a: boolean): void;
}

void class C extends D {
  // MethodDefinition
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  foo(_a: boolean) {}

  // ClassProperty
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  bar?: (_b: boolean) => void;
};

// TSPropertySignature
({ foo: undefined } as {
  // eslint-disable-next-line @foxglove/no-boolean-parameters
  foo?: (_b: boolean) => void;
});

// keep isolatedModules happy
export default {};
