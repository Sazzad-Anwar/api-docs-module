import { ApiData, ApiType } from './type.model';

export const SingleApi: ApiType = {
    isGrouped: false,
    groupName: '',
    name: '',
    description: '',
    url: {
        path: '' /* set api endpoint*/,
        variables: {
            isRequired: false /* if required make false*/,
            params: {} /* set parameters like {"id":"1"}*/,
        },
    },
    method: '' /* set api method as 'GET','POST','PUT','DELETE' */,
    body: {
        isRequired: false /* if required make false*/,
        params: {} /* set parameters like {"id":"1"}*/,
    },
    headers: {
        isRequired: false /* if required make false*/,
        params: {} /* set parameters like {"token":"set token"}*/,
    },
    query: {
        isRequired: false /* if required make false*/,
        params: {} /* set parameters like {"_start":"0","_limit":"10"}*/,
    },
};

export const ApiModel: ApiData = {
    collectionName: '',
    baseUrl: '',
    routes: [{ ...SingleApi }],
};

export const DemoStructure: ApiData = {
    collectionName: 'JSON placeholder',
    baseUrl: 'https://jsonplaceholder.typicode.com',
    routes: [
        {
            isGrouped: true,
            groupName: 'Posts',
            name: 'Get Comments of Posts',
            description: '',
            url: {
                path: '/posts/:id/comments',
                variables: {
                    isRequired: true,
                    params: {
                        id: '1',
                    },
                },
            },
            method: 'GET',
            body: {
                isRequired: false,
                params: {},
            },
            headers: {
                isRequired: false,
                params: {},
            },
            query: {
                isRequired: true,
                params: {
                    _start: '0',
                    _limit: '10',
                },
            },
        },
    ],
};
