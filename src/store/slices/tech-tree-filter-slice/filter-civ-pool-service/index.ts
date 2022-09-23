import { FilterMode, TechTreeFilterState } from '..';
import { ICiv } from '../../../../api/civs/civs-api';

export function filterCivPool(state: TechTreeFilterState): ICiv[] {
  const { itemsFilter, filterMode } = state;

  const filterFn =
    filterMode === FilterMode.HAS_ALL ? filterByAll : filterByAny;

  const allCivLists = itemsFilter.map((item) => item.civs!);

  return allCivLists.length > 0 ? allCivLists.reduce(filterFn) : [];
}

function filterByAll(matchedCivs: ICiv[], itemCivs: ICiv[]): ICiv[] {
  return matchedCivs.filter((civ) => hasCiv(itemCivs, civ));
}

function filterByAny(matchedCivs: ICiv[], itemCivs: ICiv[]): ICiv[] {
  const newCivs = itemCivs.filter((itemCiv) => !hasCiv(matchedCivs, itemCiv));
  return [...matchedCivs, ...newCivs];
}

function hasCiv(civs: ICiv[], civToCheck: ICiv): boolean {
  return civs.some((civ) => civ.id === civToCheck.id);
}
