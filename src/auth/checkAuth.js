const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        //todo check objKey
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey
        return next()
    } catch (error) {

    }
}
const permission = (permission) => {
    return (req, res, next) => {
        console.log(req.objKey);
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permisstion denied'
            })
        }
        console.log('permissions::', req.objKey.permissions);
        const validPermisstion = req.objKey.permissions.includes(permission)
        if (!validPermisstion) {
            return res.status(403).json({
                message: 'Permisstion denied'
            })
        }
        return next()
    }
}

const asyncHandler = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    apiKey,
    permission,
    asyncHandler
}