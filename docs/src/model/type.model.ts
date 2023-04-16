export type ApiType = {
    isGrouped: boolean;
    groupName?: string;
    id?: string;
    name: string;
    description: string;
    url: {
        path: string;
        variables?: {
            isRequired: boolean;
            params?: object | null;
        };
    };
    method: string;
    body?: {
        isRequired: boolean;
        params?: object | null;
    };
    headers?: {
        isRequired: boolean;
        params?: object | null;
    };
    query?: {
        isRequired: boolean;
        params?: object | null;
    };
};

export type ApiData = {
    baseUrl: string;
    id?: string;
    collectionName: string;
    routes: ApiType[];
};

export type SideBarPropsType = {
    apiId: string;
    collectionId: string;
    className?: string;
};

export type StatusType = {
    status: number;
    statusText: string;
    time: string;
};
