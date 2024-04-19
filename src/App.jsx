import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import Items from './pages/Items.jsx';
import Item from './pages/Item.jsx';

import Routerblock from './components/Routerblock.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Routerblock />}>
      <Route index element={<Home />} />
      <Route path="users" element={<Users />} />
      <Route path="items" element={<Items />} />
      <Route path="items/:id" element={<Item />} />
    </Route>
  )
)

function App({routers}) {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
