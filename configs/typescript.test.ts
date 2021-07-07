// Use --report-unused-disable-directives to validate errors

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
    Promise.resolve(42); // eslint-disable-line @typescript-eslint/no-floating-promises
  };

  () => Promise.reject(42);
  async () => Promise.reject(42); // eslint-disable-line @foxglove/no-return-promise-resolve
  // eslint-disable-next-line @typescript-eslint/require-await
  async () => {
    Promise.reject(42); // eslint-disable-line @typescript-eslint/no-floating-promises
  };
}
void noReturnPromiseResolve;

// keep isolatedModules happy
export default {};
