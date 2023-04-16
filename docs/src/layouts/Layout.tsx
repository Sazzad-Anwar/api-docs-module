import SideBar from '../components/SideBar/Sidebar';
import api from '../assets/APi.json';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { ApiData } from '../model/type.model';
import useDeviceWidth from '../hooks/useDeviceWidth/useDeviceWidth';
import { ERoutes } from '../Router/routes.enum';

export default function Layout() {
    const { theme } = useThemeToggler();
    const { isMobileWidth } = useDeviceWidth();
    const { id, apiId } = useParams();
    const location = useLocation();

    return (
        <>
            <div className="flex shadow-xl w-full">
                {location.pathname !== ERoutes.DASHBOARD && (
                    <SideBar apiId={apiId!} collectionId={id!} />
                )}
                <div
                    className={
                        location.pathname === ERoutes.DASHBOARD
                            ? 'w-full'
                            : isMobileWidth
                            ? 'w-full'
                            : 'w-9/12 2xl:w-10/12'
                    }
                >
                    <Outlet />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
            />
        </>
    );
}
