// INITIALIZING AOS ANIMATION ON START
AOS.init();

// DEFINING CONSTANTS

const quoteText = document.querySelector(".quote");
const authorName = document.querySelector(".author-name");
const quoteBtn = document.querySelector("button");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const heartIcon = document.getElementById("heartIcon");

// FUNCTION FOR FETCHING API FOR QUOTES

const randomQuote = () => {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading...";
    fetch("https://api.quotable.io/random")
        .then(response => response.json())
        .then(data => {
            quoteText.innerText = data.content;
            authorName.innerText = data.author;
            quoteBtn.innerText = "New Quote";
            quoteBtn.classList.remove("loading");
        
        });
    heartIcon.style.color = "white";    
}

// FOR SOUND BUTTON

soundBtn.addEventListener("click", () => {
    
    let mensaje = new SpeechSynthesisUtterance();
    mensaje.text = `${quoteText.innerText} by ${authorName.innerText}`;
    speechSynthesis.speak(mensaje);
});

// FOR COPY BUTTON
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});

// FOR STORING LIKED QUOTES IN USERS INTERNAL STORAGE


// Check if there are liked quotes in localStorage and retrieve them
let LikedQuotes = JSON.parse(localStorage.getItem('likedQuotes')) || [];

// Function to update the UI with liked quotes

const updateLikedQuotes = () => {
    // Clear the previous liked quotes AND Append the new liked quotes
};

heartIcon.addEventListener("click", () => {
    
    if (heartIcon.style.color !== "red") {
        // Add the quote to likedQuotes if it's not already liked
        LikedQuotes.push({
            quote: quoteText.innerText,
            author: authorName.innerText
        });
        heartIcon.style.color = "red";
    } else {
        // Remove the quote from likedQuotes if it's already liked
        LikedQuotes = LikedQuotes.filter(quote => quote.quote !== quoteText.innerText);
        heartIcon.style.color = "white";
    }

    // Saving to local storage
    localStorage.setItem('likedQuotes', JSON.stringify(LikedQuotes));

    // Update the UI with the new liked quotes
    updateLikedQuotes();
});

// CALLING RANDOM QUOTE TO GENERATE NEW QUOTE

quoteBtn.addEventListener("click", randomQuote);


