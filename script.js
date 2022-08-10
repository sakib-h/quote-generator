const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-Quote");

let apiQuotes = [];

// Show new quote
const newQuote = () => {
	// Pick a random quotes from api quotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check the quote length to determine the style
	if (quote.text.length > 120) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}
	quoteText.textContent = quote.text;

	// Check if author field is blank and replace it with "Unknown"
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
};

// Get Quotes from api

// --> New Way <--
const getQuotes = async () => {
	const apiUrl = "https://type.fit/api/quotes";
	try {
		apiQuotes = await fetch(apiUrl).then((res) => res.json());
		newQuote();
	} catch (error) {
		// Handle error here
		console.log(error);
	}
};

// On Load

getQuotes();
