console.log('Client side javascript file is loaded.');

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');
const messageOne = document.querySelector('#message_1');
const messageTwo = document.querySelector('#message_2');


weatherForm.addEventListener('submit', (e) => 
{
    e.preventDefault();

    const location = searchElement.value;

    messageOne.textContent = 'Loading weather content.';
    messageTwo.textContent = '';
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>
    {
        response.json().then((data) =>
        {
            if (data.error)
            {
                messageOne.textContent = data.error;
            }else
            {
                messageOne.textContent = 'Location: ' + data.location;
                messageTwo.textContent = 'Forecast: ' + data.forecastData;
            }
        });
    });
});