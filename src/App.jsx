import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './routes/appRoutes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
