import { lazy, Suspense, useEffect, useState } from 'react';
import { BsFillSunFill } from 'react-icons/bs';
import { CiFolderOn } from 'react-icons/ci';
import { FaMoon } from 'react-icons/fa';
import { MdMoreVert } from 'react-icons/md';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Index';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { ApiData } from '../model/type.model';
import { ERoutes } from '../Router/routes.enum';
import useStore from '../store/store';
import { API_DETAILS, UPDATE_COLLECTION } from '../utils/DynamicUrl';
const Modal = lazy(() => import('../components/Modal/Modal'));

export default function ApiCollections() {
    const store = useStore();
    let { theme, toggleTheme } = useThemeToggler();
    let [openModal, setOpenModal] = useState<boolean>(false);
    let [isDeleteBtnPressed, setIsDeleteBtnPressed] = useState<boolean>(false);
    let [selectedCollection, setSelectedCollection] = useState<ApiData>({} as ApiData);
    const navigate = useNavigate();

    useEffect(() => {
        store.getCollection();
        store.getEnvironment();
    }, []);

    return (
        <>
            <div className="w-full h-screen dark:bg-dark-primary-50 bg-white px-5">
                <div className="container mx-auto pt-10">
                    <div className="flex items-center justify-between">
                        <h1 className="dark:text-white text-lg mb-5">API collections</h1>
                        <div className="flex items-center">
                            {store.env !== 'production' && (
                                <button
                                    onClick={() => navigate(ERoutes.CREATE_API_COLLECTION)}
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white"
                                >
                                    Create Collection
                                </button>
                            )}
                            <button
                                onClick={toggleTheme}
                                className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1.5 items-end justify-self-end rounded border  px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                            >
                                {theme === 'dark' ? (
                                    <FaMoon size={18} />
                                ) : (
                                    <BsFillSunFill size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
                        {store?.apiCollections?.map((collection) => (
                            <div
                                key={collection?.id}
                                onClick={() => {
                                    navigate(
                                        API_DETAILS(collection?.id!, collection?.routes[0]?.id!),
                                    );
                                }}
                                className="p-5 rounded-md border border-primary group shadow-none hover:shadow-md normal-transition hover:border-primary dark:hover:border-primary flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <CiFolderOn
                                        size={30}
                                        className="text-primary group-hover:text-primary mr-2"
                                    />
                                    <span className="text-primary truncate w-[18ch] text-lg group-hover:text-primary">
                                        {collection?.collectionName}
                                    </span>
                                </div>
                                {store.env !== 'production' && (
                                    <button
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setOpenModal(true);
                                            setIsDeleteBtnPressed(false);
                                            setSelectedCollection(collection);
                                        }}
                                        className="p-2 hover:bg-gray-200 normal-transition rounded-full text-primary active:dark:bg-transparent"
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
                <Modal
                    isOpen={openModal}
                    onClose={() => {
                        setOpenModal(!openModal);
                    }}
                >
                    <div className="dark:bg-dark-primary-50 bg-white p-5 w-full md:w-[50vw] lg:w-[40vw] xl:w-[30vw] 2xl:w-[25vw]">
                        <div className="flex items-start justify-between">
                            <h1 className="text-lg font-medium dark:text-white">Actions</h1>
                            <button
                                onClick={() => setOpenModal(!openModal)}
                                className="p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white"
                            >
                                <VscChromeClose />
                            </button>
                        </div>
                        <div className="h-10 mt-5">
                            <h1 className="dark:text-white">
                                {isDeleteBtnPressed
                                    ? 'Are you sure to delete this collection ?'
                                    : 'You can edit or delete the collection'}
                            </h1>
                        </div>
                        {isDeleteBtnPressed ? (
                            <div className="mt-4 flex items-center justify-end">
                                <button
                                    onClick={() => setIsDeleteBtnPressed(false)}
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 active:bg-primary dark:border-primary text-white ml-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-green-500 px-3 bg-green-500 font-medium hover:shadow-lg active:scale-95 active:bg-green-500 dark:border-green-500 text-white ml-2"
                                    onClick={() => {
                                        store.deleteApiCollection(selectedCollection?.id!);
                                        setOpenModal(false);
                                    }}
                                >
                                    Yes
                                </button>
                            </div>
                        ) : (
                            <div className="mt-4 flex items-center justify-end">
                                <button
                                    onClick={() =>
                                        navigate(UPDATE_COLLECTION(selectedCollection?.id!))
                                    }
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 active:bg-primary dark:border-primary text-white ml-2"
                                >
                                    Edit
                                </button>
                                <button
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-red-600 px-3 bg-red-600 font-medium hover:shadow-lg active:scale-95 active:bg-red-500 dark:border-red-600 text-white ml-2"
                                    onClick={() => {
                                        setIsDeleteBtnPressed(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </Modal>
            </Suspense>
        </>
    );
}
