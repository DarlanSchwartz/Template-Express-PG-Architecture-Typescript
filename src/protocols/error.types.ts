const CONFLICT = "Conflict";
const NOT_FOUND = "NotFound";
const UNPROCESSABLE = "Unprocessable";
const BAD_REQUEST = "BadRequest";
const INTERNAL = "Internal";
export const ErrorType = { CONFLICT, NOT_FOUND, UNPROCESSABLE, BAD_REQUEST, INTERNAL };

export class CustomError extends Error {
  constructor(public type: string, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}