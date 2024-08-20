import { AUTHENTICATION_ERROR_MESSAGE } from "./constants";
export class AuthenticationError extends Error {
  constructor() {
    super(AUTHENTICATION_ERROR_MESSAGE);
    this.name = 'AuthenticationError';
  }
}
