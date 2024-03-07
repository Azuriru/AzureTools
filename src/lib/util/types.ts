export type ValueOf<T> = T[keyof T];

export type JSONValue = null | boolean | number | string | JSONValue[] | { [k: string]: JSONValue };