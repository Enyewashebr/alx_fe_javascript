// Array to store quotes
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivational" },
  { text: "Stay hungry, stay foolish.", category: "Inspirational" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Wisdom" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong> - ${randomQuote.category}</p>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';

    showRandomQuote(); // Display the newly added quote
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Display an initial quote when the page loads
showRandomQuote();
// Function to create the form for adding a new quote
function createAddQuoteForm() {
  const formContainer = document.createElement('div');
  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;

  document.body.appendChild(formContainer);
}

// Call the function to create the form for adding a new quote
createAddQuoteForm();
function displayRandomQuote() {
  // Select a random quote from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM to display the random quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}
