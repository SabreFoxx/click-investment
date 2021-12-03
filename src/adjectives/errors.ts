export class SimpleError {
    constructor(public message?: string) {
        this.message = 'Something bad happened; please try again later.'
    }
}