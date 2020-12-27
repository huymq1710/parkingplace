import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/', name: '', component: Dashboard },
];

export default routes;
