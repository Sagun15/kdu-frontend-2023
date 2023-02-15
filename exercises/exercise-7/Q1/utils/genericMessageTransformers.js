/**
 * It creates an object of successful fetch request and return it
 * @param {*} data It stores the content fetched
 * @param {*} message It stores the message / feedback
 * @returns object containing status, data and message
 */
const getSuccessObject = (data, message) => {
  return {
    status: "success",
    data,
    message,
  };
};

/**
 * It creates an object of unsuccessful fetch request and return it
 * @param {*} error It stores the error occured
 * @param {*} message It stores the description of error (like line number, reason or any custom message)
 * @returns object containing status, data and message
 */
const getErrorObject = (error, message) => {
  return {
    status: "failure",
    error,
    message,
  };
};

export { getSuccessObject, getErrorObject };
