import { ERoutes } from '../Router/routes.enum';

export const CREATE_API = (id: string) => {
    return ERoutes.CREATE_API.split(':id').join(id);
};

export const API_DETAILS = (id: string, apiId: string) => {
    let routeWithId = ERoutes.API_DETAILS.split(':id').join(id);
    return routeWithId.split(':apiId').join(apiId);
};

export const UPDATE_COLLECTION = (id: string) => {
    return ERoutes.UPDATE_COLLECTION.split(':id').join(id);
};

export const UPDATE_API = (id: string, apiId: string) => {
    let routeWithId = ERoutes.UPDATE_API.split(':id').join(id);
    console.log(routeWithId.split(':apiId').join(apiId));
    return routeWithId.split(':apiId').join(apiId);
};
