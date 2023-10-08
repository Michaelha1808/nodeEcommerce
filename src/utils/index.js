const _ = require('lodash')

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds)
}
const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 1]))
}
const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(el => [el, 0]))
}
const removeUndefinedObject = obj => {
    Object.keys(obj).forEach(k => {
        if (obj[k] == null) {
            delete obj[k]
        }
    })
    return obj
}
const updateNestedObjectParser = obj => {
    console.log(`[1]::`, obj);
    const final = {}
    Object.keys(obj).forEach(k => {
        if (typeof obj[k] === 'Object' && !Array.isArray(obj[k])) {
            const respone = updateNestedObjectParser(obj[k])
            Object.keys(respone).forEach(a => {
                final[`${k}.${a}`] = res[a]
            })
        } else {
            final[k] = obj[k]
        }
    })
    console.log(`[2]::`, final);
    return final
}
module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndefinedObject,
    updateNestedObjectParser
}