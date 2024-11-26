import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Users from './modules/users/pages/Users';
import Posts from './modules/users/pages/Posts';
import Tasks from './modules/tasks/pages/Tasks';

import PageLayout from './shared/components/PageLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/users" />} />

        <Route path="/users" element={<Users />} />
        <Route path="/users/:id/posts" element={<Posts />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="*" element={<PageLayout title="Page not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
