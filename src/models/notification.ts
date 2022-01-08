export class Notification {
    constructor(private title: string,
        private content: string,
        private createdAt: string,
        private link: string = null,
        private isRead = false) { }
}