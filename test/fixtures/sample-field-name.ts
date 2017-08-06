import * as faker from 'faker';

export default function sampleFieldName() {
  const words: string[] = faker.lorem.words(5).split(' ');
  const name = words.reduce(
    (name: string, currentWord: string, currentIndex) => {
      if (currentIndex === 0) return currentWord;

      return `${name}[${currentWord}]`;
    },
    ''
  );

  return {
    words,
    name
  };
}
