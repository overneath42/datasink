import 'mocha';
import { assert } from 'chai';
import * as utils from '../src/datasink.utils';
import sampleFieldName from './fixtures/sample-field-name';

describe('decodeName', () => {
  const { words, name } = sampleFieldName();
  let testResult: string[];

  beforeEach(() => {
    testResult = utils.decodeName(name);
  });

  it('should split a string properly', () => {
    assert.equal(testResult.length, words.length, 'did not split the string properly');
  });

  it('should have the correct sequence', () => {
    for (let i = 0; i < testResult.length; i++) {
      assert.equal(testResult[i], words[i], `word at index ${i} did not match`);
    }
  });
});
