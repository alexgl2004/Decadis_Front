import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import User from './pages/User.jsx';
import Users from './pages/Users.jsx';
import Items from './pages/Items.jsx';

import Routerblock from './components/Routerblock.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Routerblock />}>
      <Route index element={<Home />} />
      <Route path="items" element={<Items />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<User />} />
    </Route>
  )
)

function App({routers}) {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
