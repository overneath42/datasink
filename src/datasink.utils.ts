import { Datasink } from '../typings.d';
import { isObject, isArray, isNull, isUndefined } from 'lodash-es';

import { transform } from 'inflection';

/**
 * Evaluates a field name and breaks it into component parts,
 * identifying individual words and ignoring divider characters.
 *
 * @param {string} name The field name to decode.
 *
 * @returns {array} Returns an array of strings extracted from the original name.
 */
export function decodeName(name: string): string[] {
  const regex = /(\w+)/g;
  let params: string[] = [];
  let match;

  // loop through all RegEx matches and push results to an array
  while ((match = regex.exec(name))) {
    params.push(match[1]);
  }

  return params;
}

/**
 * Generate a hidden input tag with a specified data attribute,
 * as well as an optional value.
 *
 * @export
 * @param {Object} field
 * @param {string} field.fieldName The value for the `name` attribute.
 * @param {string} field.propName The value for the data attribute.
 * @param {string} field.attrName The attribute name to create, provided as `camelCase`.
 * @param {string} [value] A value to save to the target data attribute.
 *
 * @return {HTMLElement} Returns a hidden field element.
 */
export function createHiddenField(
  field: Datasink.HiddenField,
  value: string
): HTMLElement {
  const { fieldName, propName, attrName } = field;
  const name = decodeName(transform(attrName, ['capitalize'])).join('');
  const id = transform(name, ['underscore']);
  const attr = transform(name, ['underscore', 'dasherize']);

  let input = document.createElement('input');

  input.setAttribute('type', 'hidden');
  input.setAttribute('name', fieldName);
  input.setAttribute('id', id);
  input.setAttribute(attr, propName);

  if (value) {
    input.setAttribute('value', value);
  }

  return input;
}

/**
 * Prepares data for insertion into hidden field. Transforms arrays of objects
 * into a JSON string of single values using an optional property.
 *
 * @param {*} data The data to prepare.
 * @param {string} [prop] A lookup property for arrays of objects.
 *
 * @returns {string} Returns a formatted value to insert into a hidden field.
 */
export function prepareData(data: any, prop?: string): string {
  if (isArray(data)) {
    return JSON.stringify(
      isObject(data[0])
        ? // if the first item is an object, use the lookup property to reduce
          // the array to a set of single values. `prop` can be one of several options
          // which are evaluated at runtime.
          data.map((item: Datasink.StateData):
            | Datasink.StateData
            | Datasink.HiddenField => {
            return item[prop || 'id'];
          })
        : // otherwise, just stringify the original data set
          data
    );
  } else if (isNull(data) || isUndefined(data)) {
    // for null or undefined values, return an empty string
    return '';
  } else {
    // for remaining types (strings or numbers), just convert to a string
    return data.toString();
  }
}
