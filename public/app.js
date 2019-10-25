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
