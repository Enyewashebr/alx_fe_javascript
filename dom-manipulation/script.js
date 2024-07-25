// Array to store the quotes
const quotes = [
  {
    text: "Believe you can and you're halfway there.",
    category: "Motivational"
  },
  {
    text: "The only way to do great work is to love what you do.",
    category: "Inspirational"
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    category: "Philosophical"
  },
  {
    text: "Impossible is just an opinion.",
    category: "Motivational"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    category: "Inspirational"
  }
];

// Function to display a random quote
function displayRandomQuote() {
  // Select a random quote from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Update the DOM to display the random quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
}

// Function to add a new quote
function addQuote() {
  // Get the new quote text and category from the input fields
  const newQuoteText = document.getElementById("newQuoteText").value;
  const newQuoteCategory = document.getElementById("newQuoteCategory").value;

  // Create a new quote object
  const newQuote = {
    text: newQuoteText,
    category: newQuoteCategory
  };

  // Add the new quote to the quotes array
  quotes.push(newQuote);

  // Clear the input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Update the DOM to display the new quote
  displayRandomQuote();
}

// Add event listener to the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
