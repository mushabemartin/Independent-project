// Get references to HTML elements
const infoForm = document.getElementById('info-form');
const display = document.getElementById('display');

// Event listener for form submission
infoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get user input from the form
    const name = infoForm.name.value;
    const bio = infoForm.bio.value;
    const image = infoForm.image.files[0]; // Assuming you're accepting an image

    // Create a new div element to display the user information
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    // Add user information to the div
    infoDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${bio}</p>
    `;

    // Create an image element and set its source
    const imageElement = document.createElement('img');
    const imageURL = URL.createObjectURL(image);
    imageElement.src = imageURL;

    // Append the image element to the div
    infoDiv.appendChild(imageElement);

    // Append the user information div to the display section
    display.appendChild(infoDiv);

    // Reset the form
    infoForm.reset();
});

document.addEventListener("DOMContentLoaded", function () {
    // Function to fetch and display information from db.json
    async function fetchAndDisplayData() {
      try {
        const response = await fetch("db.json"); // Adjust the path to your db.json file
        const data = await response.json();
  
        if (data && data.others) {
          const othersSection = document.getElementById("others");
  
          // Clear any existing content
          othersSection.innerHTML = "";
  
          // Iterate through the data and create a card for each person
          data.others.forEach((person) => {
            // Create a card for the person
            const personCard = document.createElement("div");
            personCard.classList.add("person-card");
  
            // Create the person's name element
            const nameElement = document.createElement("h3");
            nameElement.textContent = person.name;
  
            // Create the person's bio element
            const bioElement = document.createElement("p");
            bioElement.textContent = person.bio;
  
            // Create the person's image element
            const imageElement = document.createElement("img");
            imageElement.src = person.image;
            imageElement.alt = person.name;
  
            // Append elements to the card
            personCard.appendChild(nameElement);
            personCard.appendChild(bioElement);
            personCard.appendChild(imageElement);
  
            // Append the card to the "others" section
            othersSection.appendChild(personCard);
          });
        }
      } catch (error) {
        console.error("Error fetching and displaying information:", error);
      }
    }
  
    // Call the function to initially populate the "others" section
    fetchAndDisplayData();
  });

  
  