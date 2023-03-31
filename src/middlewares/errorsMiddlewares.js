import httpStatus from "http-status";

export function handleErrors(err, req, res, next) {
    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send({ message: err.message })
    }
    if (err.name === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send({ message: err.message })
    }
}