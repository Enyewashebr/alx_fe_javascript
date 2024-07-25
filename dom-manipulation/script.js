// // Array to store quotes
// let quotes = [
//   { text: "The only way to do great work is to love what you do.", category: "Motivational" },
//   { text: "Stay hungry, stay foolish.", category: "Inspirational" },
//   { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Wisdom" }
// ];

// // Function to display a random quote
// function showRandomQuote() {
//   const quoteDisplay = document.getElementById('quoteDisplay');
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const randomQuote = quotes[randomIndex];

//   quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong> - ${randomQuote.category}</p>`;
// }

// // Function to add a new quote
// function addQuote() {
//   const newQuoteText = document.getElementById('newQuoteText').value;
//   const newQuoteCategory = document.getElementById('newQuoteCategory').value;

//   if (newQuoteText && newQuoteCategory) {
//     const newQuote = { text: newQuoteText, category: newQuoteCategory };
//     quotes.push(newQuote);

//     // Clear input fields
//     document.getElementById('newQuoteText').value = '';
//     document.getElementById('newQuoteCategory').value = '';

//     showRandomQuote(); // Display the newly added quote
//   } else {
//     alert('Please enter both a quote and a category.');
//   }
// }

// // Event listener for the "Show New Quote" button
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// // Display an initial quote when the page loads
// showRandomQuote();
// // Function to create the form for adding a new quote
// function createAddQuoteForm() {
//   const formContainer = document.createElement('div');
//   formContainer.innerHTML = `
//     <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
//     <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
//     <button onclick="addQuote()">Add Quote</button>
//   `;

//   document.body.appendChild(formContainer);
// }

// // Call the function to create the form for adding a new quote
// createAddQuoteForm();
// function displayRandomQuote() {
//   // Select a random quote from the quotes array
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const randomQuote = quotes[randomIndex];

//   // Update the DOM to display the random quote
//   const quoteDisplay = document.getElementById("quoteDisplay");
//   quoteDisplay.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
// }

// // Function to save quotes array to local storage
// function saveQuotes() {
//   localStorage.setItem('quotes', JSON.stringify(quotes));
// }

// // Function to load quotes array from local storage
// function loadQuotes() {
//   const quotesFromStorage = localStorage.getItem('quotes');
//   if (quotesFromStorage) {
//     quotes = JSON.parse(quotesFromStorage);
//   }
// }

// // Function to export quotes to a JSON file
// function exportToJsonFile() {
//   const quotesJson = JSON.stringify(quotes, null, 2);
//   const blob = new Blob([quotesJson], { type: 'application/json' });
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'quotes.json';
//   a.click();
//   URL.revokeObjectURL(url);
// }

// // Function to import quotes from a JSON file
// function importFromJsonFile(event) {
//   const fileReader = new FileReader();
//   fileReader.onload = function(event) {
//     const importedQuotes = JSON.parse(event.target.result);
//     quotes.push(...importedQuotes);
//     saveQuotes();
//     alert('Quotes imported successfully!');
//   };
//   fileReader.readAsText(event.target.files[0]);
// }

// // Event listener for the "Add Quote" button
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// // Load quotes from local storage when the page loads
// loadQuotes();
// showRandomQuote();
// Function to populate categories in the filter dropdown
function populateCategories() {
  const categories = ['All Categories', ...new Set(quotes.map(quote => quote.category))];
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Clear existing options
  categoryFilter.innerHTML = '';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.toLowerCase();
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category.toLowerCase() === selectedCategory);
  displayFilteredQuotes(filteredQuotes);
}

// Function to display filtered quotes
function displayFilteredQuotes(filteredQuotes) {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  filteredQuotes.forEach(quote => {
    const quoteElement = document.createElement('p');
    quoteElement.innerHTML = `<strong>${quote.text}</strong> - ${quote.category}`;
    quoteDisplay.appendChild(quoteElement);
  });
}

// Event listener for category filter change
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Update categories and filter quotes when a new quote is added
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    
    populateCategories(); // Update categories in the filter dropdown
    filterQuotes(); // Filter quotes based on selected category

    // Clear input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteCategory').value = '';
  } else {
    alert('Please enter both a quote and a category.');
  }
}

// Function to fetch quotes data from the server
async function fetchQuotesFromServer() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch data from server');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to sync local quotes with server data
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  // Simple conflict resolution: Server data takes precedence
  quotes = serverQuotes;

  saveQuotes(); // Update local storage with server data
  populateCategories(); // Update categories in the filter dropdown
  filterQuotes(); // Filter quotes based on selected category
}

// Load quotes from local storage and initialize the application
loadQuotes();
populateCategories();
filterQuotes();

// Function to check for conflicting data and inform the user
function checkForConflicts() {
  // Compare local data with server data
  // Notify the user if conflicts are detected
  // Provide options for conflict resolution
  // This can be achieved through UI elements or alerts
}

// Function to post new quote data to the server
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newQuote)
    });

    if (!response.ok) {
      throw new Error('Failed to post data to server');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Example of posting a new quote to the server
const newQuote = {
  text: 'Example quote text',
  category: 'Example category'
};

postQuoteToServer(newQuote)
  .then(data => {
    if (data) {
      console.log('Quote posted successfully:', data);
      // Handle the response data as needed
    }
  })
  .catch(error => {
    console.error('Error posting quote:', error);
  });
// Function to synchronize local quotes with server data
async function syncQuotes() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch data from server');
    }
    
    const serverQuotes = await response.json();

    // Simple conflict resolution: Server data takes precedence
    quotes = serverQuotes;

    saveQuotes(); // Update local storage with server data
    populateCategories(); // Update categories in the filter dropdown
    filterQuotes(); // Filter quotes based on selected category

    console.log('Quotes synchronized successfully.');
  } catch (error) {
    console.error('Error syncing quotes:', error);
  }
}

// Function to periodically sync local quotes with server data
function startSyncInterval(intervalTime) {
  // Initial sync when the interval starts
  syncQuotes();

  // Setting up periodic sync at the specified interval time
  setInterval(() => {
    syncQuotes();
  }, intervalTime);
}

// Call startSyncInterval with the interval time in milliseconds (e.g., 30000 for every 30 seconds)
startSyncInterval(30000); // Sync every 30 seconds
