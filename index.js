const apiKey = "2a7ec32993fe49a5bec52950dc2aa20e";

const searchURL = `https://newsapi.org/v2/everything`;

function formatQueryParams(params) {
  //create an array of the keys in the "params" object
  const queryItems = Object.keys(params)
    //for each of the keys in that array, create a string with the key and the key's value in the "params" object
    .map((key) => `${key}=${params[key]}`);
  //return a string of the keys and values, separated by "&"
  return queryItems.join("&");
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $("#results-list").empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; (i < responseJson.articles.length) & (i < maxResults); i++) {
    // for each video object in the articles
    //array, add a list item to the results
    //list with the article title, source, author,
    //description, and image
    $("#results-list").append(
      `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
        <p>${responseJson.articles[i].source.name}</p>
        <p>By ${responseJson.articles[i].author}</p>
        <p>${responseJson.articles[i].description}</p>
        <img src='${responseJson.articles[i].urlToImage}'>
        </li>`
    );
  }
  //display the results section
  $("#results").removeClass("hidden");
}

function getNews(query, maxResults = 10) {
  //create the query parameters
  const params = {
    apiKey, // property value shorthand
    q: query,
    language: "en",
    pageSize: maxResults,
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  console.log(url);

  fetch(url)
    .then((response) => {
      // the new code starts here
      if (response.ok) {
        return response.json();
      }
      console.log(response);
      throw new Error(response.status);
    })
    .then((responseJson) => displayResults(responseJson, maxResults))
    .catch((err) => {
      $("#js-error-message").text(
        `Something went wrong: ${err.message} error!`
      );
    });
}

//watch for the form submission
function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();
    //capture the value of the user's input
    const searchTerm = $("#js-search-term").val();
    const maxResults = $("#js-max-results").val();
    getNews(searchTerm, maxResults);
  });
}

$(watchForm);
