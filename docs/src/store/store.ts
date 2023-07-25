import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { ApiData } from '../model/type.model';
import api from '../utils/api';

type Store = {
    isSidebarOpen: boolean;
    api: ApiData;
    env: 'production' | 'development';
    apiCollections: ApiData[];
    getEnvironment: () => void;
    getCollection: () => void;
    addApiCollection: (apiData: string) => void;
    updateApiCollection: (apiData: string) => void;
    addApi: (collectionId: string, id: string, apiData: string) => void;
    toggleSidebar: () => void;
    getApiDetails: (id: string) => void;
    deleteApi: (id: string, collectionId: string) => void;
    deleteApiCollection: (id: string) => void;
    updateApiDetails: (id: string, collectionId: string, apiData: string) => void;
};

const useStore = create<Store>((set) => ({
    isSidebarOpen: false,
    env: 'development',
    apiCollections: localStorage.getItem('apiCollections')
        ? JSON.parse(localStorage.getItem('apiCollections')!)
        : [],
    api: {} as ApiData,
    getEnvironment: async () => {
        try {
            let { data } = await api.get('/api-docs/api/env');
            set((state) => ({
                ...state,
                env: data && data.data,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                env: 'development',
            }));
        }
    },
    getCollection: async () => {
        try {
            let { data } = await api.get('/api-docs/api/collections');
            localStorage.setItem('apiCollections', JSON.stringify(data && data.data));
            set((state) => ({
                ...state,
                apiCollections: data && data.data,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    addApi: async (collectionId: string, id: string, apiData: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            let updatedCollection = apiCollections?.map((collection) => {
                if (collection?.id === collectionId) {
                    let data = {
                        ...JSON.parse(apiData),
                        id,
                    };
                    collection?.routes?.push(data);
                    return collection;
                } else {
                    return collection;
                }
            });

            localStorage.setItem('apiCollections', JSON.stringify(updatedCollection));

            await api.put('/api-docs/api/collections', {
                collection: JSON.stringify(updatedCollection),
            });

            set((state) => ({
                ...state,
                apiCollections: updatedCollection,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    addApiCollection: async (apiData: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            let apiDetails: ApiData = JSON.parse(apiData);
            apiDetails.id = uuid();
            apiCollections.push(JSON.parse(apiData));
            localStorage.setItem('apiCollections', JSON.stringify(apiCollections));
            await api.post('/api-docs/api/collections', {
                collection: JSON.stringify(apiCollections),
            });
            set((state) => ({
                ...state,
                apiCollections,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    updateApiCollection: async (apiData: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            let apiCollection: ApiData = JSON.parse(apiData);
            apiCollections = apiCollections.map((item) => {
                if (item?.id === apiCollection?.id) {
                    return { ...item, ...apiCollection };
                } else {
                    return item;
                }
            });
            localStorage.setItem('apiCollections', JSON.stringify(apiCollections));

            await api.put('/api-docs/api/collections', {
                collection: JSON.stringify(apiCollections),
            });

            set((state) => ({
                ...state,
                apiCollections,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    getApiDetails: (id: string) => {
        let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
            ? JSON.parse(localStorage.getItem('apiCollections')!)
            : [];
        let apiDetails: ApiData =
            apiCollections?.find((item) => item?.id === id) ?? ({} as ApiData);
        set((state) => ({
            ...state,
            api: apiDetails,
        }));
    },
    updateApiDetails: async (id: string, collectionId: string, apiData: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            let updatedApiCollections: ApiData[] = apiCollections?.map((item) => {
                if (item?.id === collectionId) {
                    let items = item?.routes?.map((route) => {
                        if (route?.id === id) {
                            return JSON.parse(apiData);
                        } else {
                            return route;
                        }
                    });
                    return { ...item, routes: items };
                } else {
                    return item;
                }
            }) as ApiData[];
            localStorage.setItem('apiCollections', JSON.stringify(updatedApiCollections));
            await api.put('/api-docs/api/collections', {
                collection: JSON.stringify(updatedApiCollections),
            });
            set((state) => ({
                ...state,
                apiCollections: updatedApiCollections,
            }));
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    deleteApiCollection: async (id: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            if (apiCollections.find((item) => item.id === id)) {
                apiCollections = apiCollections.filter((item) => item.id !== id);
                localStorage.setItem('apiCollections', JSON.stringify(apiCollections));
                await api.put('/api-docs/api/collections', {
                    collection: JSON.stringify(apiCollections),
                });
                set((state) => ({
                    ...state,
                    apiCollections,
                }));
            }
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    deleteApi: async (id: string, collectionId: string) => {
        try {
            let apiCollections: ApiData[] = localStorage.getItem('apiCollections')
                ? JSON.parse(localStorage.getItem('apiCollections')!)
                : [];
            if (apiCollections.find((item) => item.id === collectionId)) {
                apiCollections = apiCollections.map((item) => {
                    if (item.id === collectionId) {
                        item.routes = item.routes.filter((route) => route.id !== id);
                    }
                    return item;
                });
                localStorage.setItem('apiCollections', JSON.stringify(apiCollections));
                await api.put('/api-docs/api/collections', {
                    collection: JSON.stringify(apiCollections),
                });
                console.log(apiCollections);
                set((state) => ({
                    ...state,
                    apiCollections,
                }));
            }
        } catch (error) {
            console.log(error);
            set((state) => ({
                ...state,
                apiCollections: [],
            }));
        }
    },
    toggleSidebar: () => {
        set((state) => ({
            ...state,
            isSidebarOpen: !state.isSidebarOpen,
        }));
    },
}));

export default useStore;
