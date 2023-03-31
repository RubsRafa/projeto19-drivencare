import httpStatus from "http-status";

export function handleErrors(err, req, res, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send({ message: err.message })
    }
    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({ message: err.message })
    }
    if (err.name === "UnauthorizedError") {
        return res.status(httpStatus.UNAUTHORIZED).SEND({ message: err.message})
    }
    if (err.name === "ForbiddenError") {
        return res.status(httpStatus.FORBIDDEN).SEND({ message: err.message})
    }
}