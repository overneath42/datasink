import { Datasink as Ds } from '../typings.d';
import { get, reduce, forEach, isObject } from 'lodash';
import * as inflection from 'inflection';
import { convert } from 'dotize';

import { DATA_SINK_ATTR } from './datasink.const';
import { createHiddenField, prepareData, decodeName } from './datasink.utils';

interface DatasinkModule {
  prepareFields(data: Ds.HiddenField[]): DocumentFragment;
  removeOldFields(fieldData: Ds.HiddenField[]): void;
  sink(): void;
}

export default function datasink(
  form: HTMLFormElement,
  fieldData: Ds.HiddenField[]
): DatasinkModule {
  /**
   * Prepares a DocumentFragment with all necessary hidden fields
   * to append to the form.
   *
   * @param {Object[]} data Data describing the fields to create.
   *
   * @return {DocumentFragment} A fully prepared set of fields.
   */
  function prepareFields(data: Ds.HiddenField[]): DocumentFragment {
    const fieldsData: Ds.StateData = convert(data) as Ds.StateData;
    const preparedFields = document.createDocumentFragment();

    forEach(fieldsData, (value: string, key: string) => {
      const name = decodeName(key).reduce(
        (name: string, currentPart: string) => `${name}${key}`,
        ''
      );

      const hiddenField: HTMLInputElement = createHiddenField(
        name,
        value
      ) as HTMLInputElement;

      preparedFields.appendChild(hiddenField);
    });

    return preparedFields;
  }

  /**
   * Removes fields from the DOM.
   *
   * @param {Object} fieldData
   */
  function removeOldFields(data: Ds.HiddenField[]) {
    forEach(data, field => {
      const name = inflection.transform(field.fieldName, [
        'camelize',
        'underscore'
      ]);
      const target = form.querySelector(`input[name="${name}"]`);

      if (target) {
        form.removeChild(target);
      }
    });
  }

  /**
   * Saves the data!
   */
  function sink() {
    const fields = prepareFields(fieldData);

    removeOldFields(fieldData);
    form.appendChild(fields);
  }

  return {
    prepareFields,
    removeOldFields,
    sink
  };
}
