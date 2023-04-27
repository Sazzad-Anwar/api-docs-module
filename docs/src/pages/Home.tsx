import useThemeToggler from '../hooks/useThemeToggle/Index';
import { FaMoon } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import { SiPostman } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import { ERoutes } from '../Router/routes.enum';
import { useEffect } from 'react';
import api from '../assets/APi.json';

export default function Home() {
    let { theme, toggleTheme } = useThemeToggler();
    let navigate = useNavigate();
    let store = useStore();

    useEffect(() => {
        store.getCollection();
    }, []);

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center dark:bg-dark-primary-50 relative">
            <div className="absolute right-5 top-5">
                <button
                    onClick={toggleTheme}
                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition items-end justify-self-end rounded border border-gray-200 p-2 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white ml-2"
                >
                    {theme === 'dark' ? <FaMoon size={18} /> : <BsFillSunFill size={18} />}
                </button>
            </div>

            <SiPostman size={60} className="text-[#c16630] mb-3" />
            <h1 className="dark:text-white text-xl">Welcome to API Docs</h1>
            <button
                onClick={() => {
                    if (store?.apiCollections?.length) {
                        navigate(ERoutes.API_COLLECTIONS);
                    } else {
                        navigate(ERoutes.CREATE_API_COLLECTION);
                    }
                }}
                className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-14 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white ml-2 mt-3"
            >
                {store?.apiCollections?.length ? 'Go to collections' : 'Create API'}
            </button>
        </div>
    );
}
