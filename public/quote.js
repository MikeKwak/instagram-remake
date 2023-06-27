const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const quoteContainer = quoteEl.parentElement;

const apiURL = "https://api.quotable.io/random";

let nextData;

async function getQuote() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const quoteContent = data.content;
    const quoteAuthor = data.author;

    quoteContainer.classList.add("hide");

    setTimeout(() => {
      quoteEl.innerText = quoteContent;
      authorEl.innerText = "~ " + quoteAuthor;

      setTimeout(() => {
        quoteContainer.classList.remove("hide");
      }, 100);
    }, 500);

    setTimeout(getQuote, 15000);
  } catch (error) {
    console.log(error);
    quoteEl.innerText = "An error happened, try again later";
    authorEl.innerText = "An error happened";
  }
}

getQuote();
