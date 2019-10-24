// implement a event and function to capture input and post to a backend endpoint   
document.addEventListener("click", function(e) {
  if (e.target.classList.contains("edit-me")) {
    let changeInput = prompt("Enter desired changes");
    console.log(changeInput)
    axios
      .post("/update-item", { text: changeInput })
      .then((data) => {
        // implement something later
        console.log(data)
      })
      .catch(err => {
        console.log(err);
      });
  }
});
