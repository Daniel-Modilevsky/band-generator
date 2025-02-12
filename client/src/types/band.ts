export type BandFormType = {
  name: string;
  description: string;
  year: number;
};

export type BandResponse = {
  textParagraph1: string;
  textParagraph2: string;
  image: string;
  stats: {
    capitalCount: number;
    numberWords: number;
    numberAllWords: number;
    isEven: boolean;
  };
};

export type BandNewType = {
  brandDescription: string;
  productType: string;
  targetUrl: string;
  brandUrl: string;
};

export type BandResult = {
  logo: string;
  bandImage: string;
  title: string;
  description: string;
  brandUrl: string;
};

export type BandSlimResult = {
  title: string;
  description: string;
  strategy?: string;
};
