import { AUTHENTICATION_TYPE } from "../utils/constants/http.constant";

export default class ApiService {

    private getHeaders(authenticationType: string){
        let headers: any = {Accept: 'application/json', 'Content-Type': 'application/json'};

        if(
            authenticationType === AUTHENTICATION_TYPE.BASIC ||
            authenticationType === AUTHENTICATION_TYPE.BEARER
        ) {
            headers['Authentication'] = `${authenticationType} ${'token-here'}`;
        }

        return headers;
    }

    get(path: string, authenticationType: string, paramsObject: any = null) {
        const oneLineParams = paramsObject === null ? '' : new URLSearchParams(paramsObject).toString();
        const fullPath = paramsObject === null ? path : path + '?';
        return fetch(fullPath + oneLineParams, {method: 'get', headers: this.getHeaders(authenticationType)});
    }

    post(path: string, authenticationType: string, body: Object = {}) {
        const payload = JSON.stringify(body);
        return fetch(path, {method: 'post', body: payload, headers: this.getHeaders(authenticationType)});
    }

    delete(path: string, authenticationType: string) {
        return fetch(path, {method: 'delete', headers: this.getHeaders(authenticationType)});
    }
}