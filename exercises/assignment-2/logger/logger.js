/**
 * It is a custom logger used for logging data and errors
 */
export const logger = {
    info: (...rest) => {
        console.info(rest)
    },
    error: (...rest) => {
        console.error(rest)
    }
}