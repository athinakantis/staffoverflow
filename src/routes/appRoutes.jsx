import Error from '../pages/Error/Error';
import Login from '../pages/Login/Login';
import List from '../pages/EmployeeList/EmployeeList';
import Root from '../pages/Root/Root';
import Form from '../pages/Form/Form';
import Menu from '../pages/Menu/Menu';
import Success from '../pages/Success/Success';
import SinglePage from '../pages/SinglePage/SinglePage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/home',
        element: <Root />,
        children: [
            {
                path: '/home',
                element: <Menu />,
            },
            {
                path: '/home/employees',
                element: <List />,
            },
            {
                path: '/home/add',
                element: <Form />,
            },
            {
                path: '/home/employees/:id',
                element: <SinglePage />,
            },
            {
                path: '/home/success',
                element: <Success />,
            },
        ],
    },
    {
        path: '/Error',
        element: <Error />,
    },
]);

export default router;
