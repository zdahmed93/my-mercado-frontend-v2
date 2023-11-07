import toast from 'react-simple-toasts';
 
export const alertError = (message) => {
    toast(message, { className: 'toast-error' })
}

export const alertSuccess = (message) => {
    toast(message, { className: 'toast-success' })
}

export const extractErrorMessage = (err) => {
    let errorMessage = err.message || 'Request failed'

    const errorWithData = err?.response?.data?.error

    if (typeof errorWithData === 'string') {
        errorMessage = errorWithData
    }
    
    if (errorWithData.details && Array.isArray(errorWithData.details)) {
        errorMessage = errorWithData.details[0].message
    }

    return errorMessage
}