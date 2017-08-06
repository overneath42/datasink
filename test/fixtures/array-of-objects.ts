import * as faker from 'faker';

export default function arrayOfObjects() {
  return [{}, {}, {}, {}, {}].map((item: Object, index: number) => {
    return {
      id: index,
      uuid: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      streetAddress: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode()
    };
  });
}
