import { Datasink } from '../typings.d';
import { get, forEach } from 'lodash-es';
import { createHiddenField, prepareData, decodeName } from './datasink.utils';

interface DatasinkModule {
  save(): void;
}

export default function datasink(
  stateData: Datasink.StateData
): DatasinkModule {
  /**
   * Prepares a DocumentFragment with all necessary hidden fields
   * to append to the form.
   *
   * @param {object} data The state data to store, saved as nested key-value pairs.
   *
   * @return {DocumentFragment} A fully prepared set of fields.
   */
  function prepareFields(data: Datasink.StateData): DocumentFragment {
    let preparedFields = document.createDocumentFragment();

    forEach(data, (field: Datasink.StateData) => {
      if (field.fieldName) {
        const dataToCommit = get(data, decodeName(field.fieldName));
        const value = prepareData(dataToCommit);

        preparedFields.appendChild(createHiddenField(field, value));
      } else {

      }
    });

    return preparedFields;
  }

  /**
   * Saves the data!
   */
  function save() {
    // TODO: something!
  }

  return {
    save
  };
}
