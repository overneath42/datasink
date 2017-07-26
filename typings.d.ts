// Type definitions for Datasink 0.1.0 Project:
// https://github.com/overneath42/innerface Definitions by: Justin Toon
// <http://thewebdepartment.me> TypeScript Version: 2.4.2

export namespace Global {

}

export namespace Datasink {
  type Options = {
    keys: string[];
    dataProp?: string;
  };

  interface StateData {
    [key: string]: any;
  }

  interface Props {

  }
}
