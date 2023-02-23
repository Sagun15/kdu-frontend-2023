const searchValue = document.querySelector(".search-bar");
const usersList = document.querySelector(".users-list");
const pagination = document.querySelector(".pagination");

let users = [], latestData = [];
let currPage = 1;
let usersLimit = 3;

const getData = async () => {
  await fetch("http://localhost:5000/getData")
    .then((data) => data.json())
    .then((data) => (users = [...data]));
};

getData();



const addPaginationButtons = (length) => {
    pagination.innerHTML = '';
    const pages = Math.ceil(length/usersLimit);
    for(let i=1; i<=pages; i++) {
        const page = `<button id=${i} onclick="changePage(this.id)">${i}</button>`;
        pagination.insertAdjacentHTML("beforeend", page);
    }
}

const displayData = (users, currPage) => {
    
  usersList.innerHTML = "";
    for (
      let i = (currPage - 1) * usersLimit;
      i < currPage * usersLimit && i < users.length;
      i++
    ) {
      const item = document.createElement("li");
      item.innerText = users[i].name;
      usersList.append(item);
    }
  };

const filterData = () => {
  if (searchValue.value !== "") {
    const updatedList = users.filter((user) =>
      user.name.startsWith(searchValue.value)
    );
    latestData = updatedList;
    displayData(updatedList, currPage);
  } else {
    console.log(users);
    latestData = users;
    displayData(users, currPage);
  }
  addPaginationButtons(latestData.length);
};

const changePage = (id) => {
    displayData(latestData ,Number(id));

}