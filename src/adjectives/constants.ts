export enum ApiEndpoints {
    REGISTRATION = '/register',
    LOGIN = '/login',
    REFRESH_LOGIN ='/refresh-login'
}

export const apiPrefix: { prod: string, dev: string, test: string } =
    { prod: 'https://', dev: 'http://localhost:3000/api', test: 'https://' }