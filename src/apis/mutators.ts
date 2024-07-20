import { DrugItem, DrugsResponse, SpellingSuggestionsResponse } from "../type";

export const mutateDrugSearchResult = (data: DrugsResponse): DrugItem[] => {
  const items: DrugItem[] = [];
  if (!!data && data.drugGroup?.conceptGroup?.length > 0) {
    data.drugGroup.conceptGroup.forEach((group) => {
      if (!!group.conceptProperties) {
        group.conceptProperties.forEach((concept) => {
          items.push({
            rxcui: concept.rxcui,
            name: concept.name,
            synonym: concept.synonym,
          });
        });
      }
    });
  }

  return items;
};

export const mutateSpellingSuggestionResult = (
  data: SpellingSuggestionsResponse
): string[] => {
  let items: string[] = [];
  if (!!data && data.suggestionGroup?.suggestionList?.suggestion) {
    items = data.suggestionGroup?.suggestionList?.suggestion;
  }

  return items;
};
