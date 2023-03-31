function conflictError(message) {
    return {
        name: "ConflictError",
        message
    }
};

// function unauthorizedError() {
//     return {
//         name: "UnauthorizedError",
//         message: "You must be signed in to continue",
//     };
// };

function duplicatedEmailError(message) {
    return {
        name: "DuplicatedEmailError",
        message
    }
};

function notFoundError(message) {
    return {
        name: "NotFoundError",
        message
    };
};

// function invalidCredentialError() {
//     return {
//         name: "InvalidCredentialsError",
//         message: "Email or password are incorrect",
//     };
// };

// function unprocessableEntityError() {
//     return {
//         name: "UnprocessableEntityError",
//         message: "This type or format is invalid",
//     };
// };

export default {
    conflictError,
    // unauthorizedError,
    duplicatedEmailError,
    notFoundError,
    // invalidCredentialError,
    // unprocessableEntityError
}