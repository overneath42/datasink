// Type definitions for dotize module

declare module 'dotize' {
  function convert(
    obj: Object | Array<Object>,
    prefix?: string
  ): Object;

  export = convert;
}