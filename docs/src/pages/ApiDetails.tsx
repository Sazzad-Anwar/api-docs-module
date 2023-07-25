import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AiOutlineReload } from 'react-icons/ai';
import { BsClipboard, BsClipboardCheck, BsFillSunFill } from 'react-icons/bs';
import { FaMoon } from 'react-icons/fa';
import { FiEdit3 } from 'react-icons/fi';
import { HiMenuAlt1 } from 'react-icons/hi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { VscChromeClose } from 'react-icons/vsc';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import rehypeSanitize from 'rehype-sanitize';
import api from '../assets/APi.json';
import { ApiMethod } from '../components/ApiFolder/Index';
import Loader from '../components/Loader/Index';
import Modal from '../components/Modal/Modal';
import useDeviceWidth from '../hooks/useDeviceWidth/useDeviceWidth';
import useThemeToggler from '../hooks/useThemeToggle/Index';
import { ApiType, StatusType } from '../model/type.model';
import { ERoutes } from '../Router/routes.enum';
import useStore from '../store/store';
import { UPDATE_API } from '../utils/DynamicUrl';
const Editor = lazy(() => import('../components/Editor/Index'));

export default function ApiDetails() {
    const { id, apiId } = useParams();
    let { theme, toggleTheme } = useThemeToggler();
    let navigate = useNavigate();
    const store = useStore();
    let apiDetails: ApiType = store?.api?.routes?.find((item: ApiType) => item?.id === apiId)!;
    let [openModal, setOpenModal] = useState<boolean>(false);
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [url, setURL] = useState<string>('');
    const [inputData, setInputData] = useState<any>({});
    const [result, setResult] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [queryObject, setQueryObject] = useState<any>({});
    const [headersObject, setHeadersObject] = useState<any>({});
    const [pathVariablesObject, setPathVariablesObject] = useState<any>({});
    const [resultStatus, setResultStatus] = useState<StatusType>({} as StatusType);
    const [currentOption, setCurrentOption] = useState<string>();
    const { isMobileWidth } = useDeviceWidth();

    const formData = new FormData();

    let apiOptions: { name: string; label: string }[] = [
        {
            name: 'headers',
            label: 'Headers',
        },
        {
            name: 'body',
            label: 'Body',
        },
        {
            name: 'query',
            label: 'Query Params',
        },
        {
            name: 'pathVariables',
            label: 'URL Params',
        },
    ];

    // Handling input data from editor
    const handleSettingHeaderData = (value: any) => {
        setHeadersObject(JSON.parse(value));
    };

    const handleSettingInputData = (value: any) => {
        setInputData(JSON.parse(value));
    };

    const handleSettingQueryData = (value: any) => {
        setQueryObject(JSON.parse(value));
    };

    const handleSettingPathVariablesData = (value: any) => {
        setPathVariablesObject(JSON.parse(value));
    };

    let setAPIresponse = useCallback((data: any) => {
        setResult(data);
    }, []);

    // Setting up params data
    useEffect(() => {
        store.getApiDetails(id!);
        setQueryObject({});
        setAPIresponse({});
        setResultStatus({} as StatusType);

        if (apiDetails?.headers?.isRequired) {
            setCurrentOption('headers');
        } else if (apiDetails?.body?.isRequired) {
            setCurrentOption('body');
        } else if (apiDetails?.query?.isRequired) {
            setCurrentOption('query');
        } else if (apiDetails?.url?.variables?.isRequired) {
            setCurrentOption('pathVariables');
        } else {
            setCurrentOption('');
        }

        if (apiDetails === null) {
            navigate(ERoutes.DASHBOARD);
        }
    }, []);

    useEffect(() => {
        setQueryObject({});
        setHeadersObject({});
        setInputData({});
        setPathVariablesObject({});
        if (apiDetails?.query?.isRequired) {
            setQueryObject(apiDetails?.query?.params);
        }
        if (apiDetails?.url?.variables?.isRequired) {
            setPathVariablesObject(apiDetails?.url?.variables?.params);
        }
        if (apiDetails?.body?.isRequired) {
            setInputData(apiDetails?.body?.params);
        }
        if (apiDetails?.headers?.isRequired) {
            setHeadersObject(apiDetails?.headers?.params);
        }
    }, [apiDetails]);

    // Setting up dynamic URL
    useEffect(() => {
        let data: string = '';
        let url: string = store?.api?.baseUrl + apiDetails?.url?.path;
        if (apiDetails?.query?.isRequired && Object.keys(queryObject!).length) {
            Object.keys(queryObject!).map((item: any, i) => {
                if (Object.values(queryObject!)[i] !== '') {
                    data += item + '=' + Object.values(queryObject!)[i];
                    if (
                        Object.keys(queryObject!).length > i + 1 &&
                        Object.values(queryObject!)[i + 1] !== ''
                    ) {
                        data += '&';
                    } else {
                        data;
                    }
                }
            });
        }

        if (apiDetails?.url?.variables?.isRequired && Object.keys(pathVariablesObject).length) {
            Object.keys(pathVariablesObject).map((_, i) => {
                if (Object.values(pathVariablesObject)[i] !== '') {
                    url = url.replace(
                        `/:${Object.keys(pathVariablesObject)[i]}`,
                        `/${Object.values(pathVariablesObject)[i]}`,
                    );
                }
            });
        }
        setURL(
            url +
                (Object.keys(queryObject!).length &&
                !Object.values(queryObject!).includes('') &&
                Object.values(queryObject!).indexOf(Object.values(queryObject!).length - 1) !==
                    Object.values(queryObject!)[Object.values(queryObject!).length - 1]
                    ? '?'
                    : '') +
                data,
        );
    }, [apiDetails, url, queryObject, pathVariablesObject, headersObject, inputData, id, apiId]);

    const makeAPIRequest = async (): Promise<void> => {
        setIsLoading(true);

        try {
            if (
                apiDetails?.url?.variables?.isRequired &&
                Object.values(pathVariablesObject).includes('')
            ) {
                debugger;
                toast.warn(`Please set the 'Path Variables'`);
            } else {
                axios.interceptors.request.use(
                    (config) => {
                        const newConfig: any = { ...config };
                        newConfig.metadata = { startTime: new Date() };
                        return newConfig;
                    },
                    (error) => {
                        return Promise.reject(error);
                    },
                );

                axios.interceptors.response.use(
                    (response) => {
                        const newRes: any = {
                            ...response,
                        };
                        newRes.config.metadata.endTime = new Date();
                        newRes.duration =
                            newRes.config.metadata.endTime - newRes.config.metadata.startTime;
                        return newRes;
                    },
                    (error) => {
                        const newError = { ...error };
                        newError.config.metadata.endTime = new Date();
                        newError.duration =
                            newError.config.metadata.endTime - newError.config.metadata.startTime;
                        return Promise.reject(newError);
                    },
                );

                let response: any = await axios({
                    method: apiDetails?.method,
                    url,
                    baseURL: api?.baseUrl,
                    headers: headersObject,
                    data:
                        apiDetails?.body?.isRequired && Object.keys(inputData).length > 0
                            ? inputData
                            : apiDetails?.body?.params,
                    timeout: 4000,
                });

                setAPIresponse(response.data);

                setResultStatus({
                    status: response?.status,
                    statusText: response?.statusText,
                    time: response?.duration + ' ms',
                });
            }

            setIsLoading(false);
        } catch (error: any) {
            console.log(error);
            setAPIresponse(error.response?.data ? error.response.data : error);

            setResultStatus({
                status: error.response?.status,
                statusText: error.response?.statusText,
                time: error.duration + ' ms',
            });

            setIsLoading(false);
        }
    };

    const payloadSize = (data: any): string => {
        // Convert JSON data to string
        const json_string = JSON.stringify(data);

        // Calculate length of string in bytes
        const string_length = new TextEncoder().encode(json_string).length;

        // Convert payload size to KB
        const payload_size_kb = +(string_length / 1024).toFixed(2);
        return payload_size_kb > 1 ? `${payload_size_kb} KB` : `${string_length} B`;
    };

    if (apiDetails === undefined) {
        return <Navigate to={ERoutes.API_COLLECTIONS} />;
    }

    return (
        <>
            {apiDetails === undefined ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full h-screen dark:bg-dark-primary-50 bg-white px-5 relative">
                        <div className="flex justify-between items-center pr-10">
                            <div className="flex items-center">
                                {isMobileWidth && (
                                    <button
                                        onClick={() => store.toggleSidebar()}
                                        className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-1 mr-2 bg-blue-600 font-medium hover:shadow-lg active:scale-95 dark:border-blue-600 text-white"
                                    >
                                        {store.isSidebarOpen ? <VscChromeClose /> : <HiMenuAlt1 />}
                                    </button>
                                )}

                                <h1 className="py-3 truncate font-medium dark:text-white text-xl sticky top-0 max-w-xl dark:bg-dark-primary-50 flex items-center justify-between">
                                    {apiDetails?.name}
                                </h1>
                            </div>
                            <div className="flex items-center">
                                {store.env !== 'production' && (
                                    <button
                                        data-tooltip-id="edit-api"
                                        data-tooltip-content="Edit API"
                                        onClick={() => navigate(UPDATE_API(id!, apiId!))}
                                        className="font-base cursor-pointer lg:text-base font-ubuntu normal-transition py-2 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary ml-2"
                                    >
                                        <FiEdit3 size={18} />
                                        <Tooltip id="edit-api" />
                                    </button>
                                )}
                                <button
                                    data-tooltip-id="documentation"
                                    data-tooltip-content="API documentation"
                                    onClick={() => setOpenModal(true)}
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-2 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                                >
                                    <IoDocumentTextOutline size={18} />
                                    <Tooltip id="documentation" />
                                </button>
                                <button
                                    data-tooltip-id="copy"
                                    data-tooltip-content="Copy"
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(url);
                                        setIsCopied(true);
                                        setTimeout(() => {
                                            setIsCopied(false);
                                        }, 2000);
                                    }}
                                    className="font-base flex items-center cursor-pointer lg:font-lg font-ubuntu normal-transition py-2 justify-self-end rounded border  px-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                                >
                                    {!isCopied ? (
                                        <>
                                            <BsClipboard size={18} />
                                            <Tooltip id="copy" />
                                        </>
                                    ) : (
                                        <>
                                            <BsClipboardCheck size={18} />
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={toggleTheme}
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition items-end justify-self-end rounded border  p-2 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                                >
                                    {theme === 'dark' ? (
                                        <FaMoon size={18} />
                                    ) : (
                                        <BsFillSunFill size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center pr-10">
                            <div className="pr-2 py-2 rounded-l-md dark:text-primary-400 ">
                                {ApiMethod(apiDetails?.method!, apiDetails?.method!)}
                            </div>
                            <div className="flex items-center w-full">
                                <span className="px-2 py-2 flex-1 bg-transparent bg-primary-400 dark:bg-transparent dark:text-primary-400 w-full ">
                                    {url}
                                </span>
                                <button
                                    onClick={() => makeAPIRequest()}
                                    className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1.5 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mt-5">
                            {apiOptions.map((option) => (
                                <button
                                    key={option.name}
                                    onClick={() => setCurrentOption(option.name)}
                                    className={
                                        'dark:text-primary-400 mr-4 flex items-center mx-2 py-1 border-b-2 rounded-bl-sm rounded-br-sm ' +
                                        (currentOption === option.name
                                            ? ' border-primary '
                                            : ' border-transparent')
                                    }
                                >
                                    <span className="tex-base mr-1">{option.label}</span>
                                    {option.name === 'headers' &&
                                        apiDetails?.headers?.isRequired && (
                                            <span className="w-1 h-1 rounded-full bg-green-500" />
                                        )}
                                    {option.name === 'body' && apiDetails?.body?.isRequired && (
                                        <span className="w-1 h-1 rounded-full bg-green-500" />
                                    )}
                                    {option.name === 'query' && apiDetails?.query?.isRequired && (
                                        <span className="w-1 h-1 rounded-full bg-green-500" />
                                    )}
                                    {option.name === 'pathVariables' &&
                                        apiDetails?.url?.variables?.isRequired && (
                                            <span className="w-1 h-1 rounded-full bg-green-500" />
                                        )}
                                </button>
                            ))}
                        </div>
                        <div className="mt-3">
                            {currentOption === 'headers' && (
                                <Suspense fallback={<Loader />}>
                                    <Editor
                                        jsonData={
                                            apiDetails?.headers?.isRequired ? headersObject : {}
                                        }
                                        readOnly={!apiDetails?.headers?.isRequired}
                                        height="20vh"
                                        setData={handleSettingHeaderData}
                                    />
                                </Suspense>
                            )}
                            {currentOption === 'body' && (
                                <Suspense fallback={<Loader />}>
                                    <Editor
                                        jsonData={apiDetails?.body?.isRequired ? inputData : {}}
                                        readOnly={!apiDetails?.body?.isRequired}
                                        height="20vh"
                                        setData={handleSettingInputData}
                                    />
                                </Suspense>
                            )}
                            {currentOption === 'query' && (
                                <Suspense fallback={<Loader />}>
                                    <Editor
                                        jsonData={apiDetails?.query?.isRequired ? queryObject : {}}
                                        readOnly={!apiDetails?.query?.isRequired}
                                        height="20vh"
                                        setData={handleSettingQueryData}
                                    />
                                </Suspense>
                            )}
                            {currentOption === 'pathVariables' && (
                                <Suspense fallback={<Loader />}>
                                    <Editor
                                        jsonData={
                                            apiDetails?.query?.isRequired ? pathVariablesObject : {}
                                        }
                                        readOnly={!apiDetails?.url?.variables?.isRequired}
                                        height="20vh"
                                        setData={handleSettingPathVariablesData}
                                    />
                                </Suspense>
                            )}
                        </div>

                        <div className="mt-3">
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <div className="mb-3 flex items-center">
                                        <h1 className="font-ubuntu text-base font-medium dark:text-white lg:text-lg">
                                            Response
                                        </h1>
                                        <button
                                            onClick={() => setAPIresponse({})}
                                            className="font-base cursor-pointer lg:font-lg font-ubuntu normal-transition py-1 items-end justify-self-end rounded border  px-3 bg-primary font-medium hover:shadow-lg active:scale-95 dark:border-primary text-white ml-2"
                                        >
                                            <AiOutlineReload />
                                        </button>
                                    </div>
                                    {Object.keys(resultStatus).length ? (
                                        <div className="flex items-center">
                                            <p className="font-ubuntu mr-4 text-base font-semibold dark:font-normal dark:text-white">
                                                Status:
                                                <span
                                                    className={
                                                        resultStatus.status
                                                            ?.toString()
                                                            .startsWith('2', 0)
                                                            ? 'ml-1 font-medium text-green-600 dark:font-normal dark:text-green-400'
                                                            : 'ml-1 font-medium text-red-500 dark:font-normal'
                                                    }
                                                >
                                                    {resultStatus.status} {resultStatus.statusText}
                                                </span>
                                            </p>

                                            <p className="font-ubuntu mr-4 text-base font-semibold dark:font-normal dark:text-white">
                                                Time:
                                                <span
                                                    className={
                                                        'ml-1 font-normal text-green-600 dark:font-normal dark:text-green-400'
                                                    }
                                                >
                                                    {resultStatus.time}
                                                </span>
                                            </p>
                                            <p className="font-ubuntu mr-4 text-base font-semibold dark:font-normal dark:text-white">
                                                Size:
                                                <span
                                                    className={
                                                        'ml-1 font-normal text-green-600 dark:font-normal dark:text-green-400'
                                                    }
                                                >
                                                    {payloadSize(result)}
                                                </span>
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                                {isLoading ? (
                                    <Loader />
                                ) : (
                                    <Suspense fallback={<Loader />}>
                                        <Editor jsonData={result} readOnly height="55vh" />
                                    </Suspense>
                                )}
                            </div>
                        </div>
                    </div>
                    <Suspense fallback={<Loader />}>
                        <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
                            <div className="dark:bg-dark-primary-50 p-5 w-[60vw] bg-white">
                                <div className="flex items-start justify-between">
                                    <h1 className="text-lg font-medium dark:text-white">
                                        API Documentation
                                    </h1>
                                    <button
                                        onClick={() => setOpenModal(!openModal)}
                                        className="p-2 rounded-full dark:hover:bg-dark-primary-40 dark:text-white"
                                    >
                                        <VscChromeClose />
                                    </button>
                                </div>

                                <div className="mt-4">
                                    <MDEditor
                                        value={apiDetails?.description}
                                        preview="preview"
                                        commands={[]}
                                        previewOptions={{
                                            rehypePlugins: [[rehypeSanitize]],
                                        }}
                                        height={650}
                                        extraCommands={[]}
                                    />
                                </div>
                            </div>
                        </Modal>
                    </Suspense>
                </>
            )}
        </>
    );
}
