import { useState } from "react";
import { DrugItem } from "../type";
import {
  mutateDrugSearchResult,
  mutateGetNDCsResponse,
  mutateSpellingSuggestionResult,
} from "./mutators";

export const useSearchDrugs = () => {
  const [data, setData] = useState<DrugItem[]>([]);
  const [loading, setLoading] = useState(false);
  const searchDrugs = async (searchValue: string) => {
    if (!searchValue) {
      setData([]);
    } else {
      setLoading(true);
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${searchValue}`
      );

      const json = await response.json();
      const items = mutateDrugSearchResult(json);

      setData(items);
      setLoading(false);
    }
  };

  return { searchDrugs, data, loading };
};

export const useSpellingSuggestions = () => {
  const [data, setData] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const spellingSuggestions = async (searchValue: string) => {
    if (!searchValue) {
      setData([]);
    } else {
      setLoading(true);
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${searchValue}`
      );

      const json = await response.json();

      const items = mutateSpellingSuggestionResult(json);

      setData(items);
      setLoading(false);
    }
  };

  return { spellingSuggestions, data, loading };
};

export const useGetNDCs = () => {
  const [data, setData] = useState<string[]>();
  const [loading, setLoading] = useState(false);
  const getNDCs = async (rxcui: string) => {
    if (!rxcui) {
      setData(undefined);
    } else {
      setLoading(true);
      const response = await fetch(
        `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`
      );

      const json = await response.json();

      const items = mutateGetNDCsResponse(json);

      setData(items);
      setLoading(false);
    }
  };

  return { getNDCs, data, loading };
};
