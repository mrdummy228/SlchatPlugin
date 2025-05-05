if (localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY == null || localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY == undefined) {
    localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY = ["https://media.tenor.com/fg9_b99SYhgAAAAC/hello-hi.gif"];
}; // ★★★★★

function remove(array, itemToRemove) {
    const index = array.indexOf(itemToRemove);

    if (index !== -1) {
        array.splice(index, 1);
    }

	return array;
} // definitely not copy pasted from geeks for geeks

const controlsSection = document.getElementsByClassName("controls-section")[0];
const newButton = document.createElement("button");

var gifBg = document.createElement("div");

var searchBar = document.createElement("input");
var searchBtn = document.createElement("button");
var favoriteBtn = document.createElement("button");
var homeBtn = document.createElement("button");

gifBg.style = "position: absolute;text-align:center;overflow-y:auto;overflow-x:hidden;background:var(--secondary-color);border: 5px solid black;border-radius:10px;top: -425px;left: 700px;width: 700px;height: 400px;";
gifBg.hidden = true;

searchBar.type = "text";
searchBar.style = "position: absolute; top: 5px; left: 60px; width:450px;";
searchBar.placeholder = "Find the best GIF... (v2)"

searchBtn.style = "position: absolute; top:12px; left:510px; width:150px;";
searchBtn.textContent = "Search GIF";

favoriteBtn.style = "position:absolute; top:12px; left:5px; width:40px;font-size:32px;";
favoriteBtn.textContent = "⭐";

homeBtn.style = "position:absolute; top:12px; left:5px; width:40px;font-size:32px;";
homeBtn.textContent = "🏠";

homeBtn.onclick = () => {
    gifBg.innerHTML = "";

    gifBg.appendChild(searchBar);
    gifBg.appendChild(searchBtn);
    gifBg.appendChild(favoriteBtn);

    searchBar.value = "";
};

controlsSection.appendChild(gifBg);

gifBg.appendChild(searchBar);
gifBg.appendChild(searchBtn);
gifBg.appendChild(favoriteBtn);

newButton.innerHTML = '<code><i class="bx bxs-file-gif"></i></code>';

newButton.onclick = () => {
    gifBg.hidden = !gifBg.hidden;

    if (!gifBg.hidden) {
        searchBar.focus();
    };
};

favoriteBtn.onclick = () => {
    gifBg.innerHTML = "";

    gifBg.appendChild(searchBar);
    gifBg.appendChild(searchBtn);
    gifBg.appendChild(homeBtn);

    favGifs = localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY.split(",");

    for (const res of favGifs) {
        if (res !== "") {
            var gif = document.createElement("img");
            var gifFavBtn = document.createElement("button");

            var gifDiv = document.createElement("div");

            gifDiv.style = "left:75px;top:50px;display:flex;";

            gif.src = res;
            gif.style = "margin:auto;cursor:pointer;border-radius:3px;width:700px;height:auto;";

            gifFavBtn.style = "position:relative; opacity:80%; right:485px; top:10px;width:40px;font-size:32px;";
            gifFavBtn.textContent = "★";
            gifFavBtn.setAttribute("parentUrl", res)
            gifFavBtn.className = "icemay_gif_picker_search_result";

            if (localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY.includes(res)) {
                gifFavBtn.style.color = "#ffff00";
            } else {
                gifFavBtn.style.color = "#7f7f7f";
            };

            gifDiv.appendChild(gif);
            gifDiv.appendChild(gifFavBtn);

            if (favGifs.indexOf(res) == 1) {
                gifDiv.style.marginTop = "60px";
            };

            gif.onclick = () => {
                send(convertLinksToHtml(res));
                toggleGifCard();
            };

            gifBg.appendChild(gifDiv);
            gifBg.appendChild(document.createElement("br"));
        };

        for (const favbtn of document.getElementsByClassName("icemay_gif_picker_search_result")) {
            favbtn.onclick = () => {
                curParUrl = favbtn.getAttribute("parentUrl");

                console.log(curParUrl);

                favGifArray = localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY.split(",");
                
                if (favGifArray.includes(curParUrl)) {
                    favbtn.style.color = "#7f7f7f";
                    favGifArray = remove(favGifArray, curParUrl);
                } else {
                    favbtn.style.color = "#ffff00";
                    favGifArray.push(curParUrl);
                };

                localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY = favGifArray;
            };
        };
    };
}

function searchForGif() {
    var query = searchBar.value;
    var reqUrl = `https://g.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA`;

    var req = new XMLHttpRequest();

    req.open("GET", reqUrl, false);
    req.send(null);

    var result = JSON.parse(req.responseText);

    gifBg.innerHTML = "";

    gifBg.appendChild(searchBar);
    gifBg.appendChild(searchBtn);
    gifBg.appendChild(homeBtn);

    for (const res of result.results) {
        var gif = document.createElement("img");
        var gifFavBtn = document.createElement("button");

        var gifDiv = document.createElement("div");

        gifDiv.style = "left:75px;top:50px;display:flex;"

        gif.src = res.media[0].gif.url;
        gif.style = "margin:auto;cursor:pointer;border-radius:3px;width:700px;height:auto;";
        gif.title = res.content_description;

        gifFavBtn.style = "position:relative; opacity:80%; right:485px; top:10px;width:40px;font-size:32px;";
        gifFavBtn.textContent = "★";
        gifFavBtn.title = res.content_description;
        gifFavBtn.setAttribute("parentUrl", res.media[0].gif.url)
        gifFavBtn.className = "icemay_gif_picker_search_result";

        if (localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY.includes(res.media[0].gif.url)) {
            gifFavBtn.style.color = "#ffff00";
        } else {
            gifFavBtn.style.color = "#7f7f7f";
        };

        gifDiv.appendChild(gif);
        gifDiv.appendChild(gifFavBtn);

        if (result.results.indexOf(res) == 0) {
            gifDiv.style.marginTop = "60px";
        };

        gif.onclick = () => {
            send(convertLinksToHtml(res.media[0].gif.url));
            toggleGifCard();
        };

        gifBg.appendChild(gifDiv);
        gifBg.appendChild(document.createElement("br"));
    };

    for (const favbtn of document.getElementsByClassName("icemay_gif_picker_search_result")) {
        favbtn.onclick = () => {
            curParUrl = favbtn.getAttribute("parentUrl");

            console.log(curParUrl);

            favGifArray = localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY.split(",");
            
            if (favGifArray.includes(curParUrl)) {
                favbtn.style.color = "#7f7f7f";
                favGifArray = remove(favGifArray, curParUrl);
            } else {
                favbtn.style.color = "#ffff00";
                favGifArray.push(curParUrl);
            };

            localStorage.ICEMAY_GIF_PICKER_FAVORITE_GIFS_ARRAY = favGifArray;
        };
    };
};

searchBtn.onclick = searchForGif;

searchBar.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        searchForGif();
    }
});

const sendButton = controlsSection.querySelector('button[onclick="sendMessage()"]');
controlsSection.insertBefore(newButton, sendButton);
