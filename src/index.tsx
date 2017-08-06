import { Datasink as Ds } from '../typings.d';
import React from 'react';

import ds from './datasink.module';

export default class Datasink extends React.Component {
  props: Ds.Props;

  componentDidUpdate() {
    const { form, fieldData } = this.props;
    ds(form, fieldData).sink();
  }

  render(): null {
    // the `Datasink` component doesn't render anything, so we return `null`
    // @see https://facebook.github.io/react/docs/react-component.html#render
    return null;
  }
}
