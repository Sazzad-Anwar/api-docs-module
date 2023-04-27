import useStore from '../store/store';
import { SiPostman } from 'react-icons/si';
import { FaMoon } from 'react-icons/fa';
import { BsFillSunFill } from 'react-icons/bs';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { useNavigate } from 'react-router-dom';
import { MdMoreVert } from 'react-icons/md';
import { Suspense, lazy, useEffect, useState } from 'react';
import Loader from '../components/Loader/Index';
import { VscChromeClose } from 'react-icons/vsc';
import { ApiData } from '../model/type.model';
import { ERoutes } from '../Router/routes.enum';
import { API_DETAILS, UPDATE_COLLECTION } from '../utils/DynamicUrl';
import config from '../../public/config.json';
const Modal = lazy(() => import('../components/Modal/Modal'));

export default function ApiCollections() {
    const store = useStore();
    let { theme, toggleTheme } = useThemeToggler();
    let [openModal, setOpenModal] = useState<boolean>(false);
    let [selectedCollection, setSelectedCollection] = useState<ApiData>({} as ApiData);
    const navigate = useNavigate();

    useEffect(() => {
        store.getCollection();
    }, []);

    return (
        <>
            <div className="w-full h-screen dark:bg-dark-primary-50 bg-white px-5 relative">
                <div className="absolute right-10 top-5 z-10">
                    <button
                        onClick={toggleTheme}
                        className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1.5 items-end justify-self-end rounded border border-gray-200 px-2 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white ml-2"
                    >
                        {theme === 'dark' ? <FaMoon size={18} /> : <BsFillSunFill size={18} />}
                    </button>
                </div>
                <div className="container mx-auto pt-10">
                    <button
                        onClick={() => navigate(ERoutes.CREATE_API_COLLECTION)}
                        className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-3 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white mb-5"
                    >
                        Create Collection
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        {store?.apiCollections?.map((collection) => (
                            <div
                                key={collection?.id}
                                onClick={() => {
                                    navigate(
                                        API_DETAILS(collection?.id!, collection?.routes[0]?.id!),
                                    );
                                }}
                                className="p-5 rounded-md border border-gray-200 dark:border-gray-700 group shadow-none hover:shadow-md normal-transition hover:border-[#c16630] dark:hover:border-[#c16630] flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <SiPostman
                                        size={30}
                                        className="dark:text-white text-black group-hover:text-[#c16630] mr-2"
                                    />
                                    <span className="dark:text-white truncate w-[18ch] text-lg group-hover:text-[#c16630]">
                                        {collection?.collectionName}
                                    </span>
                                </div>
                                {config.environment === 'development' && (
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenModal(true);
                                            setSelectedCollection(collection);
                                        }}
                                        className="p-2 hover:bg-gray-200 group-hover:text-[#c16630] hover:dark:bg-gray-800 normal-transition rounded-full dark:text-white active:dark:bg-transparent"
                                    >
                                        <MdMoreVert />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {!store?.apiCollections?.length && (
                    <div className="h-[50vh] flex justify-center items-center dark:text-gray-300">
                        <h1 className="font-medium text-xl">No collection found</h1>
                    </div>
                )}
            </div>
            <Suspense fallback={<Loader />}>
                <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
                    <div className="dark:bg-dark-primary-50 bg-white p-5 w-[20vw]">
                        <div className="flex items-start justify-between">
                            <h1 className="text-lg font-medium dark:text-white">Actions</h1>
                            <button
                                onClick={() => setOpenModal(!openModal)}
                                className="p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white"
                            >
                                <VscChromeClose />
                            </button>
                        </div>

                        <div className="mt-4 flex items-center justify-center">
                            <button
                                onClick={() => navigate(UPDATE_COLLECTION(selectedCollection?.id!))}
                                className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-3 bg-blue-600 font-medium hover:shadow-lg active:scale-95 active:bg-blue-500 dark:border-blue-600 text-white ml-2"
                            >
                                Edit
                            </button>
                            <button
                                className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-3 bg-blue-600 font-medium hover:shadow-lg active:scale-95 active:bg-blue-500 dark:border-blue-600 text-white ml-2"
                                onClick={() => {
                                    store.deleteApiDetails(selectedCollection?.id!);
                                    setOpenModal(false);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </Suspense>
        </>
    );
}
