export default class HttpException extends Error {
    errors: object;
    status: number;
    message: string;

    constructor(status: number, message: string, errors: object) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.message = message;
    }
}
