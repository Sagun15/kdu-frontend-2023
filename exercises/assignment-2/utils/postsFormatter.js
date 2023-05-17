import moment from "moment/moment.js";

/**
 * 
 * @param {*} post Post data to be formatted
 * @returns Post data and relative timestamp when post was posted
 */
const formatPost = (post) => {
  let time = "";
  if (Date.now() - post.time <= 3600 * 1000) {
    time = moment(post.time).fromNow();
  } else {
    time = moment(post.time).format("YYYY-MM-DD h:mm a");
  }
  return {
    ...post,
    time: time,
  };
};

export { formatPost };
