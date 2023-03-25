interface IFilter {
  id: number;
  variable: string;
  operator: string;
  value: string;
}

type TOperatorString = 'AND' | 'OR';

export type { IFilter, TOperatorString };
