import { Navigate, createBrowserRouter } from 'react-router-dom';
import { ERoutes } from './routes.enum';
import { Suspense, lazy } from 'react';
import Loader from '../components/Loader/Index';
const AddAPI = lazy(() => import('../pages/AddAPI'));
const EditApiCollections = lazy(() => import('../pages/EditApiCollections'));
const UpdateApi = lazy(() => import('../pages/UpdateApi'));
const Home = lazy(() => import('../pages/Home'));
const ApiDetails = lazy(() => import('../pages/ApiDetails'));
const ApiCollections = lazy(() => import('../pages/ApiCollections'));
const AddApiCollection = lazy(() => import('../pages/AddApiCollection'));
const Error = lazy(() => import('../components/Error/Error'));
const Layout = lazy(() => import('../layouts/Layout'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={ERoutes.DASHBOARD} />,
    },
    {
        path: ERoutes.DASHBOARD,
        element: (
            <Suspense fallback={<Loader fullPage />}>
                <Layout />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loader fullPage />}>
                <Error />
            </Suspense>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<Loader fullPage />}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: ERoutes.API_DETAILS,
                element: (
                    <Suspense fallback={<Loader fullPage />}>
                        <ApiDetails />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: ERoutes.CREATE_API_COLLECTION,
        element: (
            <Suspense fallback={<Loader fullPage />}>
                <AddApiCollection />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loader fullPage />}>
                <Error />
            </Suspense>
        ),
    },
    {
        path: ERoutes.UPDATE_COLLECTION,
        element: (
            <Suspense fallback={<Loader fullPage />}>
                <EditApiCollections />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loader fullPage />}>
                <Error />
            </Suspense>
        ),
    },
    {
        path: ERoutes.API_COLLECTIONS,
        element: (
            <Suspense fallback={<Loader />}>
                <ApiCollections />
            </Suspense>
        ),
    },
    {
        path: ERoutes.CREATE_API,
        element: (
            <Suspense fallback={<Loader />}>
                <AddAPI />
            </Suspense>
        ),
    },
    {
        path: ERoutes.UPDATE_API,
        element: (
            <Suspense fallback={<Loader />}>
                <UpdateApi />
            </Suspense>
        ),
    },
]);

export default router;
