import 'mocha';
import jsdom from 'jsdom';
import { expect } from 'chai';
import * as utils from '../src/datasink.utils';
import sampleFieldName from './fixtures/sample-field-name';
import arrayOfObjects from './fixtures/array-of-objects';

const globalAny: any = global;

describe('decodeName', () => {
  const { words, name } = sampleFieldName();
  let testResult: string[];

  beforeEach(() => {
    testResult = utils.decodeName(name);
  });

  it('should split a string properly', () => {
    expect(testResult.length).to.equal(words.length);
  });

  it('should have the correct sequence', () => {
    for (let i = 0; i < testResult.length; i++) {
      expect(testResult[i]).to.equal(words[i]);
    }
  });
});

// describe('createHiddenField', () => {
//   const { JSDOM } = jsdom;

//   before(() => {
//     globalAny.document = new JSDOM(
//       '<!DOCTYPE html><html><head></head><body></body></html>'
//     );
//     global.window = document.parentWindow;
//     global.navigator = { userAgent: 'node.js' };
//   });

//   let input: HTMLInputElement;
//   let name: string;
//   let value: string;

//   beforeEach(() => {
//     name = 'sampleName';
//   });

//   it('creates fields properly', () => {
//     input = utils.createHiddenField(name);

//     expect(input.type).to.equal('hidden');
//     expect(input.name).to.equal(name);
//   });

//   it('assigns a value when provided one', () => {
//     value = 'sample value';
//     input = utils.createHiddenField(name, value);

//     expect(input.value).to.equal(value);
//   });

//   after(() => {
//     window.close();
//     delete global.document;
//   });
// });

describe('prepareData', () => {
  it('should create a JSON array of numbers from an array of objects', () => {
    const array = arrayOfObjects();
    const ids = array.map(
      (item: { [key: string]: string | number }) => item.id
    );

    const testResult = utils.prepareData(array);
    const expectedResult = `[${ids.join(',')}]`;

    expect(testResult).to.equal(expectedResult);
  });

  it('should use an optional property if provided', () => {
    const array = arrayOfObjects();
    const uuids = array.map(
      (item: { [key: string]: string | number }) => item.uuid
    );

    const testResult = utils.prepareData(array, 'uuid');
    const expectedResult = `["${uuids.join('","')}"]`;

    expect(testResult).to.equal(expectedResult);
  });

  it('should return an empty string for null or undefined', () => {
    const nullTestResult = utils.prepareData(null);
    const undefinedTestResult = utils.prepareData(undefined);

    expect(nullTestResult).to.equal('');
    expect(undefinedTestResult).to.equal('');
  });

  it('should return a string for a string or number value', () => {
    const stringTestResult = utils.prepareData('5');
    const numberTestResult = utils.prepareData(5);

    expect(stringTestResult).to.equal('5');
    expect(numberTestResult).to.equal('5');
  });
});
