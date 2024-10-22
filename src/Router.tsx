import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import NotFound from './pages/NotFound';
import Users from './pages/Users';
import Tasks from './pages/Tasks';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/users" />} />

        <Route path="/users" element={<Users />} />
        <Route path="/tasks" element={<Tasks />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
