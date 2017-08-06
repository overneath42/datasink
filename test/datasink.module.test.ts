import { Datasink as Ds } from '../typings.d';

import 'mocha';
import { expect } from 'chai';
import ds from '../src/datasink.module';
import sampleData from './fixtures/sample-data';

describe('datasink module', () => {
  let form: HTMLFormElement;
  let fieldData: Ds.HiddenField[];

  before(() => {
    form = document.createElement('form');
    fieldData = sampleData();
  });

  it('should create the appropriate fields', () => {
    ds(form, fieldData).sink();
    // TODO: test something
  });
});
