import { Box, Button, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import CohortConditionDropdown from 'src/pages/home/components/CohortConditionDropdown';
import styles from './CohortSelection.module.css';
import { type IFilter } from 'src/shared/interfaces/customTypes';

export interface ICohortSelection {}

const CohortSelection: React.FC<ICohortSelection> = () => {
  const [filters, setFilters] = useState<IFilter[]>([]);

  const handleAddFilter = (): void => {
    const lastFilterId =
      filters.length > 0 ? filters[filters.length - 1].id : 0;
    const newFilterId = lastFilterId + 1;
    const newFilterState = [
      ...filters,
      {
        id: newFilterId,
        variable: '',
        operator: '',
        value: '',
      },
    ];
    setFilters(newFilterState);
  };

  const handleDeleteFilter = (id: number): void => {
    const newFilterState = filters.filter((f) => f.id !== id);
    setFilters(newFilterState);
  };

  const handleFilterChange = useMemo(
    () =>
      (data: IFilter): void => {
        const newFilterState = filters.map((f: IFilter) => {
          if (f.id === data.id) {
            return data;
          }
          return f;
        });
        setFilters(newFilterState);
      },
    []
  );

  return (
    <Box className={styles.container}>
      <Typography variant="h5">Cohort Selection</Typography>
      <Box
        sx={{
          marginTop: 2,
          width: '100%',
        }}
      >
        {filters.map((filter: IFilter) => (
          <CohortConditionDropdown
            key={filter.id}
            filter={filter}
            handleDeleteFilter={handleDeleteFilter}
            handleFilterChange={handleFilterChange}
          />
        ))}
      </Box>
      <Box>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleAddFilter}
        >
          Add Condition
        </Button>
      </Box>
    </Box>
  );
};

export default CohortSelection;
