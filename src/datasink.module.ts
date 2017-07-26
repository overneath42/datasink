import { Datasink } from '../typings.d';

export default function datasink(stateData: Datasink.StateData): { save(): void } {
  function save() {
    // TODO: something!
  }

  return {
    save
  };
}
