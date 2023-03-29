interface IFilter {
  id: number;
  variable: string;
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

export type { IFilter, TOperatorString, ICohortListData };
