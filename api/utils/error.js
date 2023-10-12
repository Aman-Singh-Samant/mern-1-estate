
//function for self creating error like password not strong enough
export const errorHandler = (statusCode, message)=>{
    const error = new Error()
    error.statusCode = statusCode
    error.message = message
    return error
}