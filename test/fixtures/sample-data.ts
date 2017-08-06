import { Datasink as Ds } from '../../typings.d';
import * as faker from 'faker';
import { times, random } from 'lodash';

export default function sampleData(data?: Ds.HiddenField[]) {
  let array: Ds.HiddenField[] = [];

  times(random(1, 7), () => {
    array.push({
      fieldName: faker.lorem.word(),
      value: faker.lorem.words(random(3, 8))
    });
  });

  return array;
}
