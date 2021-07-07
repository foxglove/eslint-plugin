// Use --report-unused-disable-directives to validate errors

/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-expressions */

// wrap in an async function to ensure no false positive in nested non-async functions
async function noReturnPromiseResolve() {
  await Promise.resolve();
  function foo() {
    return Promise.resolve();
    return Promise.resolve<number>(42);
    return Promise.reject(42);
    return Promise.reject<number>(42);
  }
  void foo;
  void (function () {
    return Promise.resolve();
  })();

  async function fooAsync() {
    return Promise.resolve(); // eslint-disable-line @foxglove/no-return-promise-resolve
    return Promise.resolve<number>(42); // eslint-disable-line @foxglove/no-return-promise-resolve
    return Promise.reject(42); // eslint-disable-line @foxglove/no-return-promise-resolve
    return Promise.reject<number>(42); // eslint-disable-line @foxglove/no-return-promise-resolve
  }
  void fooAsync;
  void (async function () {
    return Promise.resolve(); // eslint-disable-line @foxglove/no-return-promise-resolve
  })();

  () => Promise.resolve(42);
  async () => Promise.resolve(42); // eslint-disable-line @foxglove/no-return-promise-resolve
  // eslint-disable-next-line @typescript-eslint/require-await
  async () => {
    Promise.resolve(42);
  };

  () => Promise.reject(42);
  async () => Promise.reject(42); // eslint-disable-line @foxglove/no-return-promise-resolve
  // eslint-disable-next-line @typescript-eslint/require-await
  async () => {
    Promise.reject(42);
  };
}
void noReturnPromiseResolve;

// keep isolatedModules happy
export default {};
