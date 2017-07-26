import { Datasink } from '../typings.d';

import ds from './datasink.module';

const Datasink = (props: Datasink.Props) => {
  ds(props).save();

  return false;
};

export default Datasink;
