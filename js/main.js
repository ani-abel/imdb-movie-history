const formEl = document.querySelector("#search-form");
const searchEl = document.querySelector("#search-field");
const resultContainer = document.querySelector(".search-results-container");

formEl.addEventListener("submit", async (e) => {
    e.preventDefault();
    //? Get the searched value
    const searchValue = searchEl.value;
    const apiKey = "be0d2ea9";

    if(searchValue && searchValue !== "") {
        const searchResults = await queryIMDB(searchValue, apiKey);

        if(searchResults?.length > 0) {
            //? Clear div of any prior content
            resultContainer.innerHTML = "";

            //? display data on the screen
            for(let index = 0; index < searchResults.length; index++) {
                //? Check if movies has poster
                if(searchResults[index]?.Poster !== "N/A") {
                    resultContainer.innerHTML += `<li>
                    <div class="movie-widget">
                        <div class="left">
                            <img src="${searchResults[index]?.Poster}" alt="${searchResults[index]?.Title}">
                        </div>
                        <div class="right">
                            <h3>Title: ${searchResults[index]?.Title}</h3>
                            <p>Year: ${searchResults[index]?.Year}</p>
                            <p>Type: ${searchResults[index]?.Type}</p>
                        </div>
                    </div>
                </li>`;
                }
                else {
                    resultContainer.innerHTML += `<li>
                    <div class="movie-widget">
                        <div class="left">
                        <img src="./assets/pexels-pixabay-247791.jpg" alt="${searchResults[index]?.Title}">
                        </div>
                        <div class="right">
                            <h3>Title: ${searchResults[index]?.Title}</h3>
                            <p>Year: ${searchResults[index]?.Year}</p>
                            <p>Type: ${searchResults[index]?.Type}</p>
                        </div>
                    </div>
                </li>`;
                }
            }
        }
        else {
            //? Display deafult if no search result was found
            //? Clear div of any prior content
            resultContainer.innerHTML = "";

            //? Inject html inside this div
            resultContainer.innerHTML = 
            ` <li>
                <h3>No Results were found</h3>
            </li>`;
        }
        
    }
    return;
});

searchEl.addEventListener("keyup", (e) => {
    if(searchEl.value === "") {
        console.log({ kkk: "Note found" });
        //? Clear Field if search form is also cleared
        resultContainer.innerHTML = "";
    }
});

async function queryIMDB(searchValue, apiKey) {
    const imdbURL = `https://www.omdbapi.com/?s=${searchValue}&ti=tt3896198&apikey=${apiKey}`;
    const responseProcess = await fetch(imdbURL);
    const responseData = await responseProcess.json();

    if(responseData?.Response === "True") {
        return responseData.Search;
    }
    else {
        return [];
    }
}