// import { getHTTPStatusCodeFromError } from '@trpc/server/http';
//
// import { ApiErrorCode, ApiErrorType } from '@/lib/errors/constants';
//
// export class ApiError extends Error {
//   constructor(message: string, statusCode: number, code: ApiErrorType) {
//     super(message);
//     this.name = this.constructor.name;
//   }
// }
//
// export class UnauthorizedError extends ApiError {
//   constructor(message: string = 'Authentication required') {
//     super(
//       message,
//       getHTTPStatusCodeFromError(ApiErrorCode.UNAUTHORIZED),
//       ApiErrorCode.UNAUTHORIZED,
//     );
//   }
// }
//
// export class PermissionError extends ApiError {
//   constructor(message: string = 'Permission denied') {
//     super(message, 403, ApiErrorCode.PermissionDenied);
//   }
// }
