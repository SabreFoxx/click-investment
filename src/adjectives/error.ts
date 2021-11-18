export class SimpleError {
    constructor(public message?: string) {
        message = 'Something bad happened; please try again later.'
    }
}