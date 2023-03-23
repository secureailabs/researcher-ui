import { Route, Routes } from 'react-router-dom';
import MinimalLayout from 'src/components/layout/MinimalLayout';
import Home from 'src/pages/home';

const Navigation = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<MinimalLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default Navigation;
