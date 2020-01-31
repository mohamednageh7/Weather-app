const form = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');


form.addEventListener('submit',(e) => {
    e.preventDefault();
    messageOne.textContent = 'Loading....'
    const location =  search.value
    const locationUrl = `http://localhost:3000/weather?address=${location}`
    fetch(locationUrl).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast
        }
        
    })
})
})