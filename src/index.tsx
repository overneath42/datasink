import { Datasink } from '../typings.d';

import ds from './datasink.module';

const Datasink = (props: Datasink.Props): null => {
  ds(props).save();

  return null;
};

export default Datasink;
