// Type definitions for Datasink 0.1.0 Project:
// https://github.com/overneath42/innerface Definitions by: Justin Toon
// <http://thewebdepartment.me> TypeScript Version: 2.4.2

export namespace Datasink {
  interface HiddenField {
    fieldName: string;
    propName: string;
    attrName: string;
  }

  interface StateData {
    [key: string]: HiddenField | StateData;
  }

  interface Props {

  }
}
