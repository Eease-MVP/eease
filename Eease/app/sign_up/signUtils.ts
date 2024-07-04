// naive email validator
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

export function validateEmail(email: string) {
    const emailRegex = /\S+@\S+\.\S{2,}/
    return emailRegex.test(email)
}

export function getErrorMessage(error: FetchBaseQueryError | SerializedError): string {
    if ('data' in error && error.data && typeof error.data === 'object' && 'message' in error.data && typeof error.data.message === 'string') {
        return error.data.message
    } else if ('error' in error) {
        return (error.error)
    } else if ('message' in error && typeof error.message === 'string') {
        return (error.message)
    } else {
        return ('An unexpected error occurred.')
    }
}