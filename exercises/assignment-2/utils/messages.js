const messages = [];

const addMessage = (message) => {
  messages.push(message);
  console.log("messages", messages);
};

const getMessages = () => {
  return messages;
};

export { addMessage, getMessages };
