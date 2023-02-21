const postsBtn = document.querySelector(".posts-btn");
const onlineBtn = document.querySelector(".online-btn");
const postsSection = document.querySelector(".posts-section");
const chatsSection = document.querySelector(".chats-section");
const addPostBtn = document.querySelector(".post__add-btn");
const members = document.querySelector(".members");
const msgField = document.querySelector(".chat__add-message");
const msgFieldDiv = document.querySelector(".chat__add");
const sendMsgBtn = document.querySelector(".chat__send-btn");
const chatBox = document.querySelector(".chat");
const posts = document.querySelector(".posts");
const messages = document.querySelector(".messages");
const socket = io();
let reciever = "",
  chatInterval = "";
 
// Get posts from api and send post data to prepend in DOM
const getPosts = async () => {
  await fetch("http://localhost:3000/posts")
    .then((response) => response.json())
    .then((data) => {
      data.map((post) => addNewPost(post));
    });
};

// Acknowledges socket about username of client
const authenticate = () => {
  const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  if (username === undefined) {
    window.location.href = "http://localhost:3000";
  } else {
    socket.emit("online", { username });
  }
  getPosts();
};
authenticate();

/**
 * Used to unselect the selected member on chat portal
 * Iterates over whole list of members and if member is selected then remove active class
 * */
const removeActiveClass = () => {
  document.querySelectorAll(".member").forEach((member) => {
    if (member.classList.contains("active")) {
      member.classList.remove("active");
    }
  });
};

// Display chat panel and hide posts panel
onlineBtn.addEventListener("click", () => {
  chatsSection.style.display = "grid";
  postsSection.style.display = "none";
  postsBtn.classList.toggle("active");
  onlineBtn.classList.toggle("active");
});

// Display posts panel and hide chat panel
postsBtn.addEventListener("click", () => {
  postsSection.style.display = "grid";
  chatsSection.style.display = "none";
  postsBtn.classList.toggle("active");
  onlineBtn.classList.toggle("active");
});

// Emit post title & description to server on click of addPost button
addPostBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.querySelector(".post__add-title").value;
  const description = document.querySelector(".post__add-description").value;
  const post = {
    title,
    description,
  };

  // Emit new post to the server
  socket.emit("newpost", post);

  document.querySelector(".post__add-title").value = "";
  document.querySelector(".post__add-description").value = "";
});

// Recieve acknowledgment of new user arrival on server 
// and requests for users present online
socket.on("notification", (msg) => {
  socket.emit("usersList", msg);
});

// Recieve updated users list present online
socket.on("usersList", ({ users }) => {
  messages.innerHTML = ''
  outputUsers(users);
});

// Add formatted message to client (sender) side
socket.on("message", (message) => {
  addMsgToUI(message);
});

// Add formatted message to reciever side
socket.on("sendMsg", (message) => {
  if (message.senderId === reciever) {
    recieveMsgOnUI(message);
  }
  socket.emit("recieveMsg", message);
});

// Updates UI after every 1 minute (Basically implemented to uodate timestamp on message)
socket.on("updateMsg", ({ msgObject, user }) => {
  if (user === msgObject.username) {
    addMsgToUI(msgObject);
  } else {
    recieveMsgOnUI(msgObject);
  }
});

// Post from server
socket.on("newpost", (post) => {
  addNewPost(post);
});

// Remove user from online members list and clear Interval for that particular user chats
socket.on("logout", (id) => {
  const member = document.getElementById(id);
  member.parentNode.removeChild(member);
  clearInterval(chatInterval);
  messages.innerHTML = "";
  removeActiveClass();
});

// Add post to DOM
const addNewPost = (post) => {
  const addPost = document.querySelector(".post__add");
  const div = document.createElement("div");
  div.classList.add("post");
  const postTitle = document.createElement("p");
  postTitle.classList.add("post__title", "post__feature");
  postTitle.innerText = post.title;
  const postTime = document.createElement("p");
  postTime.classList.add("post__timestamp", "post__feature");
  postTime.innerText = post.time;
  const underline = document.createElement("hr");
  underline.classList.add("post__underline");
  const postDescription = document.createElement("p");
  postDescription.classList.add("post__description", "post__feature");
  postDescription.innerText = post.description;
  div.appendChild(postTitle);
  div.appendChild(postTime);
  div.appendChild(underline);
  div.appendChild(postDescription);
  posts.prepend(div);

  // Scroll to top
  window.scrollTo(0, 0);
};

// Add members to DOM
const outputUsers = (users) => {
  members.innerHTML = "";
  users.forEach((user) => {
    const div = document.createElement("div");
    div.classList.add("member");
    div.setAttribute("id", user.id);
    const tag = document.createElement("p");
    tag.classList.add("member__tag");
    tag.innerText = user.username[0];
    const name = document.createElement("p");
    name.classList.add("member__name");
    name.innerText = user.username;
    div.appendChild(tag);
    div.appendChild(name);
    members.appendChild(div);
  });
};

// Add message to DOM on client (user) end
const addMsgToUI = (message) => {
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("chat__message-block", "chat__message-block-left");
  const messageTag = document.createElement("p");
  messageTag.classList.add("chat__message-tag");
  messageTag.innerText = message.username[0];
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat__message", "chat__message-left");
  const msgTitle = document.createElement("p");
  msgTitle.classList.add("message__title", "message__feature");
  msgTitle.innerText = message.username;
  const msgTimestamp = document.createElement("p");
  msgTimestamp.classList.add("message__timestamp", "message__feature");
  msgTimestamp.innerText = message.time;
  const underline = document.createElement("hr");
  underline.classList.add("message__underline");
  const msgDescription = document.createElement("p");
  msgDescription.classList.add("message__description", "message__feature");
  msgDescription.innerText = message.msg;
  messageDiv.appendChild(msgTitle);
  messageDiv.appendChild(msgTimestamp);
  messageDiv.appendChild(underline);
  messageDiv.appendChild(msgDescription);
  parentDiv.appendChild(messageDiv);
  parentDiv.appendChild(messageTag);
  messages.appendChild(parentDiv);

  messages.scrollTop = messages.scrollHeight - messages.clientHeight;
};

// Add message to DOM on reciever end
const recieveMsgOnUI = (message) => {
  const parentDiv = document.createElement("div");
  parentDiv.classList.add("chat__message-block", "chat__message-block-right");
  const messageTag = document.createElement("p");
  messageTag.classList.add("chat__message-tag");
  messageTag.innerText = message.username[0];
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("chat__message", "chat__message-right");
  const msgTitle = document.createElement("p");
  msgTitle.classList.add("message__title", "message__feature");
  msgTitle.innerText = message.username;
  const msgTimestamp = document.createElement("p");
  msgTimestamp.classList.add("message__timestamp", "message__feature");
  msgTimestamp.innerText = message.time;
  const underline = document.createElement("hr");
  underline.classList.add("message__underline");
  const msgDescription = document.createElement("p");
  msgDescription.classList.add("message__description", "message__feature");
  msgDescription.innerText = message.msg;
  messageDiv.appendChild(msgTitle);
  messageDiv.appendChild(msgTimestamp);
  messageDiv.appendChild(underline);
  messageDiv.appendChild(msgDescription);
  parentDiv.appendChild(messageTag);
  parentDiv.appendChild(messageDiv);
  messages.appendChild(parentDiv);

  messages.scrollTop = messages.scrollHeight - messages.clientHeight;
};

// Send message to server
sendMsgBtn.addEventListener("click", () => {
  const message = msgField.value;
  if (message === "" || reciever === "") {
    return;
  } else {
    msgField.value = "";
    socket.emit("sendMsg", { message, reciever });
  }
});

// To update real time on chat
const updateRealTimeChats = () => {
  if (reciever !== "") {
    messages.innerHTML = "";
    socket.emit("getAllMessages", reciever);
  }
};

// Highlight selected user on UI and get reciever id on click of member
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("member")) {
    removeActiveClass();
    reciever = e.target.id;
    document.getElementById(reciever).classList.add("active");
    messages.classList.remove("hidden");
    messages.innerHTML = "";
    socket.emit("getAllMessages", reciever);
    if (chatInterval !== "") {
      clearInterval(chatInterval);
    }
    chatInterval = setInterval(updateRealTimeChats, 1000 * 60);
  }
});
