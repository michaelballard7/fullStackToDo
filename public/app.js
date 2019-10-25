// create feature:

document.getElementById("create-form").addEventListener('submit',(e)=>{
  e.preventDefault();

  // retrieve text from input
  let userInput = document.querySelector('#create-field')

  // retrieve list 
  let itemList = document.querySelector('#item-list');

  // create a reusable function to create an item
  let itemTemplate = (input)=>{
    return `<li
          class="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
        >
          <span class="item-text">${input.text}</span>
          <div>
            <button data-id="${input._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${input._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
          </div>
        </li>`;
  };

  // create an axios post to the server
  axios.post('create-item',{item: userInput.value})
    .then((res)=>{

      // create the html for a new item
      itemList.insertAdjacentHTML('beforeend',itemTemplate(res.data));

      // clear field  and refocus
      userInput.value = ""
      userInput.focus()
  
    })
    .catch(err => {
      console.error(err.message)
    })
})


// implement a event and function to capture input and post to a backend endpoint
document.addEventListener("click", function(e) {
  // delete feature
  if (e.target.classList.contains("delete-me")) {
    if (confirm("Are you sure you want to delete this?")) {
      axios
        .post("/delete-item", {
          id: e.target.getAttribute("data-id")
        })
        .then(() => {
          e.target.parentElement.parentElement.remove();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  // update feature
  if (e.target.classList.contains("edit-me")) {
    let changeInput = prompt(
      "Enter desired changes",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );

    if (changeInput) {
      axios
        .post("/update-item", {
          text: changeInput,
          id: e.target.getAttribute("data-id")
        })
        .then(data => {
          // implement item changes once post request succesful
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = changeInput;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
