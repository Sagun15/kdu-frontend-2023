const users = [];

// Join user to chat
function userJoin(id, username) {
  const user = { id, username };

  users.push(user);

  return user;
}

// Get current user
function getUserById(id) {
  return users.find((user) => user.id === id);
}

// Get All users except current
function getAllUsersExceptCurrent(id) {
  const allUsers = users.filter((user) => user.id !== id);
  return allUsers;
}

// Get All users
function getAllUsers() {
  return users;
}

// User leaves chat - updates user array
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

export {
  userJoin,
  getAllUsersExceptCurrent,
  getAllUsers,
  getUserById,
  userLeave,
};
