export type historyEntry = {
  index: string;
  name: string;
  description: string;
  year: number;
  image: string;
  paragraph1: string;
  paragraph2: string;
  summary: string;
  creationTimestamp: number;
  analytics: {
    capitalCount: number;
    numberWordsCount: number;
    numberAllWords: number;
    isEven: boolean;
  };
};
