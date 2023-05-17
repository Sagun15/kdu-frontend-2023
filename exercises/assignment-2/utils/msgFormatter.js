import moment from "moment/moment.js";

/**
 * 
 * @param {*} msg message to be formatted
 * @param {*} username Sender name
 * @param {*} recieverName Reciever name
 * @param {*} time Timestamp when message was emitted
 * @returns formatted object containing all details (Relative time wrt message posted)
 */
const formatMsg = (msg, username, recieverName, time) => {
  if (Date.now() - Number(time) <= 600 * 1000) {
    time = moment(time).fromNow();
  } else {
    time = moment(time).format("h:mm a");
  }
  return {
    username,
    recieverName,
    msg,
    time,
  };
};

export { formatMsg };
