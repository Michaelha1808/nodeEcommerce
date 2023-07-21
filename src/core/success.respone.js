
const StatusCode = {
    OK: 200,
    CREATED:201
}

const ReasonStatusCode = {
    OK: 'Success',
    CREATED:'Created'
}

class SuccessRespone{
    constructor({message, statusCode = StatusCode.OK , reasonStatusCode = ReasonStatusCode.OK, metadata = {}} ){
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }
    send(res, headers = {}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessRespone{
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessRespone{
    constructor({ options ={} ,message, statusCode= StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata}){
        super({message, statusCode, reasonStatusCode, metadata})
        this.option = options
    }
}

module.exports = {
    OK,
    CREATED,
    SuccessRespone
}
