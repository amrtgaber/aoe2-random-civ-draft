import { DraftParametersState, FilterMode } from '.';
import { ICiv } from '../../api/civs-api';

export function filterCivPool(state: DraftParametersState): ICiv[] {
  const { unitsFilter, techsFilter, buildingsFilter, filterMode } = state;

  const filterFn =
    filterMode === FilterMode.HAS_ALL ? filterByAll : filterByAny;

  const allCivLists = [...unitsFilter, ...techsFilter, ...buildingsFilter].map(
    (item) => item.civs
  );

  return allCivLists.length > 0
    ? allCivLists.reduce(filterFn, allCivLists[0])
    : [];
}

function filterByAll(civs: ICiv[], newCivs: ICiv[]): ICiv[] {
  return civs.filter((civ) => hasCiv(newCivs, civ));
}

function filterByAny(civs: ICiv[], newCivs: ICiv[]): ICiv[] {
  const newUniques = newCivs.filter((newCiv) => !hasCiv(civs, newCiv));
  return [...civs, ...newUniques];
}

function hasCiv(civs: ICiv[], civToCheck: ICiv): boolean {
  return civs.some((civ) => civ.id === civToCheck.id);
}
