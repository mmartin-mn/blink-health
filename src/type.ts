// TODO: Improve
export type DrugsResponse = {
  drugGroup: {
    conceptGroup: {
      tty: string;
      conceptProperties: {
        language: string;
        name: string;
        rxcui: string;
        suppress: string;
        synonym: string;
        tty: string;
        umlscui: string;
      }[];
    }[];
  };
};

export type DrugItem = {
  rxcui: string;
  name: string;
  synonym: string;
};
