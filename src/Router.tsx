import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Users from './pages/users/UsersPage';
import Posts from './pages/posts/PostsPage';
import Tasks from './pages/tasks/TasksPage';

import { PostsLayout } from './shared/components/PostsLayout/PostsLayout';
import PageLayout from './shared/components/PageLayout/PageLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/users" />} />

        <Route path="/users" element={<PostsLayout />}>
          <Route index element={<Users />} />
          <Route path=":id/posts" element={<Posts />} />
        </Route>

        <Route path="/tasks" element={<Tasks />} />

        <Route path="*" element={<PageLayout title="Page not Found" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
