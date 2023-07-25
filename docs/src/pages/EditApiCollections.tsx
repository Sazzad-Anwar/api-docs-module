import { lazy, Suspense, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { HiOutlineCode } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Error from '../components/Error/Error';
import Loader from '../components/Loader/Index';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { DemoStructure } from '../model/api-model';
import { ApiData } from '../model/type.model';
import { ERoutes } from '../Router/routes.enum';
import useStore from '../store/store';
const Modal = lazy(() => import('../components/Modal/Modal'));
const Editor = lazy(() => import('../components/Editor/Index'));

export default function EditApiCollections() {
    let { theme, toggleTheme } = useThemeToggler();
    let navigate = useNavigate();
    let [apiDetailsDoc, setApiDetailsDoc] = useState<string>('');
    let [isEdited, setIsEdited] = useState<boolean>(false);
    let [openModal, setOpenModal] = useState<boolean>(false);
    let [hasError, setHasError] = useState<boolean>(false);
    let [hasSyntaxError, setHasSyntaxError] = useState<boolean>(false);
    let store = useStore();
    let params = useParams();

    let handleSetData = (value: string): void => {
        try {
            let jsonValue = JSON.parse(value) as ApiData;
            let idGeneratedRoutes = jsonValue?.routes?.map((route) => ({
                ...route,
                id: route?.id ?? uuid(),
            }));
            let updatedJSON: ApiData = {
                id: jsonValue?.id,
                collectionName: jsonValue?.collectionName,
                baseUrl: jsonValue?.baseUrl,
                routes: idGeneratedRoutes,
            };
            setApiDetailsDoc(JSON.stringify(updatedJSON));
            setIsEdited(true);
            setHasSyntaxError(false);
        } catch (error: any) {
            console.log(error.message);
            setHasSyntaxError(true);
        }
    };

    if (store.env === 'production') {
        return <Error message="You have no permission" />;
    }

    return (
        <div className="h-screen w-full dark:bg-dark-primary-50">
            <div className="container mx-auto pt-10">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                navigate(-1);
                            }}
                            className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded pr-2  font-medium active:scale-95  mr-2"
                        >
                            <BiArrowBack className="text-dark dark:text-white" size={25} />
                        </button>
                        <h1 className="text-xl dark:text-gray-200 font-medium mb-0">
                            Update API collection
                        </h1>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="font-base flex items-center cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 justify-self-end rounded border  px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                            onClick={() => setOpenModal(true)}
                        >
                            <HiOutlineCode size={20} className="mr-1" />
                            <span className="hidden lg:block">Show structure</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1.5 items-end justify-self-end rounded border  px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                        >
                            {theme === 'dark' ? <FaMoon size={18} /> : <BsFillSunFill size={18} />}
                        </button>
                    </div>
                </div>
                <Suspense fallback={<Loader />}>
                    <div
                        className={
                            hasError
                                ? 'border-2 overflow-hidden border-red-600'
                                : 'border-2 border-transparent'
                        }
                    >
                        <Editor
                            jsonData={store?.apiCollections?.find(
                                (collection) => collection?.id === params?.id,
                            )}
                            readOnly={false}
                            height="60vh"
                            setData={handleSetData}
                        />
                    </div>
                    {hasError && (
                        <span className="text-red-600 text-sm block my-2">
                            *collectionName, baseUrl, name, path, method can not be empty*
                        </span>
                    )}
                </Suspense>

                <button
                    disabled={!isEdited || hasSyntaxError}
                    onClick={() => {
                        if (apiDetailsDoc !== '') {
                            let doc: ApiData = JSON.parse(apiDetailsDoc);
                            let hasErrorStructure = doc.routes.filter(
                                (api) => !api.method || !api.name || !api.url.path,
                            );
                            if (!doc.collectionName || !doc.baseUrl || hasErrorStructure.length) {
                                setHasError(true);
                                setTimeout(() => setHasError(false), 3000);
                            } else {
                                store.updateApiCollection(apiDetailsDoc);
                                navigate(ERoutes.API_COLLECTIONS);
                            }
                        }
                    }}
                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-14 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white mt-3 disabled:dark:border-primary disabled:bg-primary disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100"
                >
                    Save
                </button>
            </div>

            <Suspense fallback={<Loader />}>
                <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
                    <div className="dark:bg-dark-primary-50 p-5 w-[60vw] bg-white">
                        <div className="flex items-start justify-between">
                            <h1 className="text-lg font-medium dark:text-white">
                                Sample structure of data to make an API docs
                            </h1>
                            <button
                                onClick={() => setOpenModal(!openModal)}
                                className="p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white"
                            >
                                <VscChromeClose />
                            </button>
                        </div>

                        <div className="mt-4">
                            <Suspense fallback={<Loader />}>
                                <Editor
                                    jsonData={DemoStructure}
                                    readOnly={true}
                                    height="60vh"
                                    width="58vw"
                                />
                            </Suspense>
                        </div>
                    </div>
                </Modal>
            </Suspense>
        </div>
    );
}
