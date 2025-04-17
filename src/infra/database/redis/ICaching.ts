export interface ICaching<T> {
    set(key: string, value: T, expirationInSeconds?: number): Promise<void>;
    get(key: string): Promise<T | null>;
    delete(key: string): Promise<void>;
}
