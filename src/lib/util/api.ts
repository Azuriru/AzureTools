import ky, { type SearchParamsOption } from 'ky';
import { type JSONValue } from './store';

export const HOST = '/dapp/auth';

type Params = {
    method?: string,
    searchParams?: SearchParamsOption,
    body?: JSONValue,
    headers?: Headers
}

export default function api<T>(path: string, {
    method = 'GET',
    searchParams,
    body: json,
    headers
}: Params): Promise<T> {
    return ky(`${HOST}/${path}`, {
        method,
        searchParams,
        json,
        headers
    })
        .json();
}