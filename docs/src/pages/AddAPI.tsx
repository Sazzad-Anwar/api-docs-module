import MDEditor from '@uiw/react-md-editor';
import { lazy, Suspense, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { HiOutlineCode } from 'react-icons/hi';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useParams } from 'react-router-dom';
import rehypeSanitize from 'rehype-sanitize';
import { v4 as uuid } from 'uuid';
import Error from '../components/Error/Error';
import Loader from '../components/Loader/Index';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { SingleApi } from '../model/api-model';
import { ApiType } from '../model/type.model';
import useStore from '../store/store';
import { API_DETAILS } from '../utils/DynamicUrl';
const Modal = lazy(() => import('../components/Modal/Modal'));
const Editor = lazy(() => import('../components/Editor/Index'));

export default function AddAPI() {
    let { theme, toggleTheme } = useThemeToggler();
    let navigate = useNavigate();
    let [apiDetailsDoc, setApiDetailsDoc] = useState<string>('');
    let [isEdited, setIsEdited] = useState<boolean>(false);
    let [openModal, setOpenModal] = useState<boolean>(false);
    let [activeTab, setActiveTab] = useState<'api' | 'description'>('api');
    let [description, setDescription] = useState<string>('');
    let [hasError, setHasError] = useState<boolean>(false);
    let params = useParams();
    let store = useStore();
    let id = uuid();

    let handleSetData = (value: string): void => {
        setApiDetailsDoc(JSON.stringify(value));
        setIsEdited(true);
    };

    if (store.env === 'production') {
        return <Error message="You have no permission" />;
    }

    return (
        <div className="h-screen w-full dark:bg-dark-primary-50">
            <div className="container mx-auto pt-10">
                <div className="flex items-center justify-between mb-5 w-full">
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                navigate(-1);
                            }}
                            className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded pr-2  font-medium active:scale-95  mr-2"
                        >
                            <BiArrowBack className="text-dark dark:text-white" size={25} />
                        </button>
                        <h1 className="text-xl dark:text-gray-200 font-medium mb-0">Add Api</h1>
                    </div>
                    <div className="flex items-center">
                        <button
                            className="font-base flex items-center cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 justify-self-end rounded border border-gray-200 px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                            onClick={() => setOpenModal(true)}
                        >
                            <HiOutlineCode size={20} className="mr-1" />
                            <span className="hidden lg:block">Show structure</span>
                        </button>
                        <button
                            onClick={toggleTheme}
                            className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1.5 items-end justify-self-end rounded border border-gray-200 px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                        >
                            {theme === 'dark' ? <FaMoon size={18} /> : <BsFillSunFill size={18} />}
                        </button>
                    </div>
                </div>
                <div className="my-3">
                    <h1 className="dark:text-white text-lg mb-1">
                        Collection Name:
                        <span className="text-base font-normal p-1 px-2 ml-5 dark:bg-gray-700 text-primary bg-gray-200 rounded">
                            {store?.api?.collectionName}
                        </span>
                    </h1>
                    <h1 className="dark:text-white text-lg">
                        Base URL:
                        <span className="text-base font-normal p-1 px-2 ml-5 dark:bg-gray-700 text-primary bg-gray-200 rounded">
                            {store?.api?.baseUrl}
                        </span>
                    </h1>
                </div>
                <div className="my-2 flex items-center">
                    <button
                        onClick={() => setActiveTab('api')}
                        className={
                            'font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded px-2  font-medium hover:shadow-lg active:scale-95 dark:text-white mt-3 disabled:dark:border-primary disabled:bg-primary disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 ' +
                            (activeTab === 'api' && 'bg-primary dark:border-primary text-white')
                        }
                    >
                        API
                    </button>
                    <button
                        onClick={() => setActiveTab('description')}
                        className={
                            'font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded px-2 ml-2 font-medium hover:shadow-lg active:scale-95 mt-3 dark:text-white disabled:dark:border-primary disabled:bg-primary disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100 ' +
                            (activeTab === 'description' &&
                                'bg-primary dark:border-primary text-white')
                        }
                    >
                        Description
                    </button>
                </div>
                {activeTab === 'api' ? (
                    <Suspense fallback={<Loader />}>
                        <div
                            className={
                                hasError
                                    ? 'border-2 overflow-hidden border-red-600'
                                    : 'border-2 border-transparent'
                            }
                        >
                            <Editor
                                jsonData={SingleApi}
                                readOnly={false}
                                height="60vh"
                                setData={handleSetData}
                            />
                        </div>
                        {hasError && (
                            <span className="text-red-600 text-sm block my-2">
                                *name, path, method can not be empty*
                            </span>
                        )}
                    </Suspense>
                ) : (
                    <MDEditor
                        value={description}
                        onChange={(value) => setDescription(value!)}
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        height={480}
                    />
                )}

                <button
                    disabled={!isEdited}
                    onClick={() => {
                        if (apiDetailsDoc !== '') {
                            let jsonData: ApiType = JSON.parse(JSON.parse(apiDetailsDoc));
                            if (
                                jsonData.method !== '' &&
                                jsonData.name !== '' &&
                                jsonData.url.path !== ''
                            ) {
                                let updatedData = { ...jsonData, description, id };
                                store.addApi(params?.id!, id, JSON.stringify(updatedData!));
                                navigate(API_DETAILS(params?.id!, id!));
                            } else {
                                setHasError(true);
                                setTimeout(() => {
                                    setHasError(false);
                                }, 3000);
                            }
                        }
                    }}
                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border border-gray-200 px-14 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white mt-3 disabled:dark:border-primary disabled:bg-primary disabled:bg-opacity-20 disabled:text-gray-400 disabled:cursor-not-allowed disabled:active:scale-100"
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
                                    jsonData={SingleApi}
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
