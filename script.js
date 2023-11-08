document.addEventListener("DOMContentLoaded", contentLoader);

function contentLoader() {
    const apiKey = 'msSHdqvdfyvG9jF8AuFgNjnZZ8HPuPyx4yKj4eMv';

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display the APOD title, image, and explanation
            const titleElement = document.querySelector("#title");
            const apodImageElement = document.querySelector("#apod-image");
            const explanationElement = document.querySelector("#explanation");
            const currentDateElement = document.querySelector("#current-date");

            titleElement.textContent = data.title;
            apodImageElement.src = data.url;
            explanationElement.textContent = data.explanation;

            // Current date
            const currentDate = new Date(data.date);
            const formattedDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            // Centered current date
            currentDateElement.textContent = formattedDate;
            currentDateElement.style.textAlign = 'center';
        })
        .catch(error => {
            console.error('An error occurred while fetching data:', error);
        });
}
