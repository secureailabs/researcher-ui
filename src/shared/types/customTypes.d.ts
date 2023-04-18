interface IFilter {
  id: number;
  series_name: string;
  operator: string;
  value: string;
}

type TOperatorString = 'AND' | 'OR';

interface ICohortListData {
  cohortId: string;
  cohortName: string;
  cohortDescription: string;
  filters: IFilter[];
  filterOperator: TOperatorString[];
}

interface IAutocompleteOptionData {
  series_name: string;
  list_value?: string[];
  __type__: string;
}

interface IAnalyticsResult {
  data: string;
  plot: string | null;
}

export type {
  IFilter,
  TOperatorString,
  ICohortListData,
  IAutocompleteOptionData,
  IAnalyticsResult,
};
