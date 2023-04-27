import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import CapitalLetterWord from '../../utils/CapitalLetterWord';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiType } from '../../model/type.model';
import { API_DETAILS } from '../../utils/DynamicUrl';

export const ApiMethod = (method: string, name: string) => {
    switch (method) {
        case 'GET':
            return (
                <span className="rounded p-2 text-sm bg-green-600 group-hover:bg-green-700 text-white">
                    {name}
                </span>
            );
        case 'POST':
            return (
                <span className="rounded p-2 text-sm bg-blue-600 group-hover:bg-blue-700 text-white">
                    {name}
                </span>
            );
        case 'PUT':
            return (
                <span className="rounded p-2 text-sm bg-purple-600 group-hover:bg-purple-700 text-white">
                    {name}
                </span>
            );
        case 'DELETE':
            return (
                <span className="rounded p-2 text-sm bg-red-600 group-hover:bg-red-700 text-white">
                    {name}
                </span>
            );
    }
};

export default function ApiFolder({
    apiName,
    api,
    className = '',
}: {
    apiName?: string;
    api: ApiType[];
    className?: string;
}) {
    let [isOpen, setIsOpen] = useState<boolean>(false);
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        if (api.find((item) => item.id === params?.apiId && item.isGrouped)) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [params]);

    return (
        <div className={'w-auto py-2 ' + className}>
            {apiName && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="dark:text-white flex items-center text-left truncate dark:hover:border-white"
                >
                    {isOpen ? (
                        <FaFolderOpen className="dark:text-white mr-2 text-gray-500" />
                    ) : (
                        <FaFolder className="dark:text-white mr-2 text-gray-500" />
                    )}
                    {CapitalLetterWord(apiName)}
                </button>
            )}
            {api.map((apiItem) => {
                if (apiItem?.isGrouped && apiItem?.groupName === apiName) {
                    return (
                        <button
                            key={apiItem?.id}
                            className={
                                (isOpen
                                    ? 'visible opacity-100 h-full w-full py-2'
                                    : ' invisible h-0 w-full opacity-0') +
                                ' ml-2 pl-4 dark:text-white block text-left truncate border-l dark:border-gray-500  hover:border-dark-primary-50 dark:hover:border-white hover:dark:text-gray-400 normal-transition rounded-r-md group' +
                                (params?.apiId === apiItem?.id
                                    ? ' dark:border-white border-dark-primary-50 bg-gray-100  dark:bg-dark-primary-50 text-base'
                                    : 'text-base border-gray-300')
                            }
                            onClick={() => {
                                navigate(API_DETAILS(params?.id!, apiItem?.id!));
                            }}
                        >
                            <span className="ml-2">{apiItem.name}</span>
                        </button>
                    );
                } else {
                    return (
                        <button
                            key={apiItem?.id}
                            className={
                                'h-full w-full py-2 pt-2 mt-2 dark:text-white block text-left truncate hover:dark:text-gray-400 normal-transition rounded-r-md group ' +
                                (params?.apiId === apiItem?.id
                                    ? '  bg-gray-100 dark:bg-dark-primary-50 text-base'
                                    : ' text-base')
                            }
                            onClick={() => {
                                navigate(API_DETAILS(params?.id!, apiItem?.id!));
                            }}
                        >
                            <span className="ml-2">{apiItem.name}</span>
                        </button>
                    );
                }
            })}
        </div>
    );
}
