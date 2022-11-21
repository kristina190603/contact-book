// ! CRUD
let names = document.querySelector(".name");
let email = document.querySelector(".email");
let imgUrl = document.querySelector(".imageUrl");
let btn = document.querySelector(".btn");
let list = document.querySelector(".task-list");

btn.addEventListener("click", () => {
  if (!names.value.trim() || !email.value.trim() || !imgUrl.value.trim()) {
    alert("Поле не заполненно");
    return;
  }
  let obj = {
    name: names.value,
    email: email.value,
    imgURL: imgUrl.value,
  };
  createElement();
  setItemtoStorage(obj);
  names.value = "";
  email.value = "";
  imgUrl.value = "";
});
createElement();

function setItemtoStorage(task) {
  let data = JSON.parse(localStorage.getItem("book-data"));
  data.push(task);
  localStorage.setItem("book-data", JSON.stringify(data));
}

function createElement() {
  list.innerHTML = "";
  if (!localStorage.getItem("book-data")) {
    localStorage.setItem("book-data", "[]");
  }
  let newData = JSON.parse(localStorage.getItem("book-data"));

  newData.forEach((item, index) => {
    let li = document.createElement("li");
    let btnEdit = document.createElement("button");
    let btnDelete = document.createElement("button");

    li.innerHTML = `name: ${item.name} email:${item.email} imgUrl:<img src="${item.imgURL}"></img>`;

    // li.innerHTML = `name:${item.name} email:${item.email} imageUrl:<img src=${item.imageurl}></img> `;
    btnEdit.innerText = "Edit";
    btnDelete.innerText = "Delete";

    document.body.append(li);
    document.body.append(btnEdit);
    document.body.append(btnDelete);

    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index , item);
    });
  });
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("book-data"));
  data.splice(index, 1);
  localStorage.setItem("book-data", JSON.stringify(data));
  createElement();
}

let mainModal = document.querySelector(".main-modal");
let inpEdit = document.querySelector(".inp-edit1");
let inpEdit1 = document.querySelector(".inp-edit2");
let inpEdit2 = document.querySelector(".inp-edit3");
let btnCloser = document.querySelector(".btn-closer");

function editElement(index, item) {
  mainModal.style.display = "block";
  inpEdit.setAttribute("id", index);
  inpEdit.value = item.name;
  
  inpEdit1.setAttribute("id", index);
  inpEdit1.value = item.email;
  inpEdit2.setAttribute("id", index);
  inpEdit2.value = item.imgURL;
}

let btnSave = document.querySelector(".btn-save");
btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("book-data"));
  let index = inpEdit.id;
  console.log(index);
  if (!inpEdit.value.trim()) {
    alert("заполните поле!");
    return;
  }
  let newBook = {
    name: inpEdit.value,
    email: inpEdit1.value,
    image: inpEdit2.value,
  };
  data.splice(index, 1, newBook);
  localStorage.setItem("book-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
});

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});
