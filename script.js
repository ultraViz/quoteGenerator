const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading

function loading(){  
  loader.hidden = false;
  quoteContainer.hidden = true;  
}

// hide loading
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
  
  
}


// Show new Quote

  function newQuote(){
    loading();
    // Pick a random Quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author filked is blank and replace with Unknown
    if(!quote.auther){
      authorText.textContent = 'Unknown';
    }else{
      authorText.textContent = quote.author;
    }
    //Check Quote lenght to determan styling
    if(quote.text.length > 120){
      quoteText.classList.add('long-quote')
    }else{
      quoteText.classList.remove('long-quote')
    }
    //setquote hide loader
    quoteText.textContent = quote.text;
    complete();

    quoteText.textContent = quote.text;
  }

// Get Quotes From API
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch(error) {
    //Catch Error Here
  }
}

//Tweet Quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
