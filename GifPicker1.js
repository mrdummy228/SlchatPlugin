const controlsSection = document.getElementsByClassName("controls-section")[0];
const newButton = document.createElement("button");

var gifBg = document.createElement("div");
var searchBar = document.createElement("input");
var searchBtn = document.createElement("button");

gifBg.style = "position: absolute;overflow-y:auto;overflow-x:hidden;background:var(--secondary-color);border: 5px solid black;border-radius:10px;top: -425px;left: 700px;width: 700px;height: 400px;";
gifBg.hidden = true;

searchBar.type = "text";
searchBar.style = "position: absolute; top: 5px; left: 10px; width:500px;"

searchBtn.style = "position: absolute; top:12px; left:510px; width:150px;"
searchBtn.textContent = "Search GIF"

controlsSection.appendChild(gifBg);

gifBg.appendChild(searchBar);
gifBg.appendChild(searchBtn);

newButton.innerHTML = '<code><i class="bx bxs-file-gif"></i></code>';

newButton.onclick = () => {
    gifBg.hidden = !gifBg.hidden;
};

searchBtn.onclick = () => {
    var query = searchBar.value;
    var reqUrl = `https://g.tenor.com/v1/search?q=${query}&key=LIVDSRZULELA`;

    var req = new XMLHttpRequest();

    req.open("GET", reqUrl, false);
    req.send(null);

    var result = JSON.parse(req.responseText);

    gifBg.innerHTML = "";

    gifBg.appendChild(searchBar);
    gifBg.appendChild(searchBtn);

    for (const res of result.results) {
        var gif = document.createElement('img');

        console.log(res.media[0])

        gif.src = res.media[0].mediumgif.url;
        gif.style = "margin-left:25px;margin-top:60px;cursor:pointer;border-radius:3px;";

        gif.onclick = () => {
            send(convertLinksToHtml(res.media[0].gif.url));
            toggleGifCard();
        };

        gifBg.appendChild(gif);
        gifBg.appendChild(document.createElement("br"));
    };
};

const sendButton = controlsSection.querySelector('button[onclick="sendMessage()"]');
controlsSection.insertBefore(newButton, sendButton);
