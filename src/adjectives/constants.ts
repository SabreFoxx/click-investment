export enum ApiEndpoints {
    USER_REGISTRATION = '/register'
}

export const apiPrefix: { prod: string, dev: string, test: string } =
    { prod: 'https://', dev: 'http://localhost:3000/api', test: 'https://' }
