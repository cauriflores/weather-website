console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.getElementById("address");
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  const url = "http://localhost:3000/weather?address=" + location;

  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error)
        messageOne.textContent = data.error
      } else {
        messageOne.textContent =  data[1].location
        messageTwo.textContent =  data[0].forecast

      }
    });
  });
});
