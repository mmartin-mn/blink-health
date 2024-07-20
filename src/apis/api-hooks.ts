import { useState } from "react";
import { DrugItem } from "../type";
import { mutateDrugSearchResult } from "./mutators";

export const useSearchDrugs = () => {
  const [data, setData] = useState<DrugItem[]>();
  const searchDrugs = async (searchValue: string) => {
    if (!searchValue) {
      setData(undefined);
    } else {
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchValue}`
      );

      const json = await response.json();
      const items = mutateDrugSearchResult(json);

      setData(items);
    }
  };

  return { searchDrugs, data };
};
