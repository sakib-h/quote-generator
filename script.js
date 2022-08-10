const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
const loading = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
	quoteContainer.hidden = false;
	loader.hidden = true;
};
// Get Quotes from api

// --> New Way <--
const getQuotes = async () => {
	loading();
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

// Show new quote
const newQuote = () => {
	loading();
	// Pick a random quotes from api quotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check the quote length to determine the style
	if (quote.text.length > 120) {
		quoteText.classList.add("long-quote");
	} else {
		quoteText.classList.remove("long-quote");
	}

	// Set quote, hide loader
	quoteText.textContent = quote.text;

	// Check if author field is blank and replace it with "Unknown"
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	complete();
};

// Tweet Quote
const tweetQuote = () => {
	const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(tweetUrl, "_blank");
};
// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
