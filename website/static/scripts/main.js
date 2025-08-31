// made by bestspyboy, 2025 :)
// licensed under MIT, full details in LICENSE
// noinspection JSUnresolvedReference

console.log("%cbsb.dev", "font-size: 3rem; font-weight: 700");
console.log("%ca website by bestspyboy", "font-size: 1.5rem; font-style: italic");

// a bunch of variables
// could useState these if i actually put effort into a framework

const elements = ["startingLine", "endingLine", "openingComment", "codeBlock"];

let currentLang = "js";
let spotifyTimestamps = { "start": -1, "end": -1, }
let spotifyEnabled = false;
let spotifySize = 0;
let progressLabelEnabled = true;

// iterates over each language
function changeLang(newLang) {
    elements.forEach((element) => {
        document.querySelector(`#${element}-${currentLang}`).hidden = true;
    });

    elements.forEach((element) => {
        document.querySelector(`#${element}-${newLang}`).hidden = false;
    });

    if (spotifyEnabled) {
        document.querySelector(`#progressBar-${currentLang}`).hidden = true;
        document.querySelector(`#progressBar-${newLang}`).hidden = false;
    }

    currentLang = newLang;
}

// change the top bar's status text
function changeStatusText(newStatus, id /*, noAnim */) {
    if (typeof id === 'undefined') id = "openingComment";

    document.querySelector(`#${id}-js`).innerText = `// ${newStatus}`;
    document.querySelector(`#${id}-lua`).innerText = `-- ${newStatus}`;
    document.querySelector(`#${id}-py`).innerText = `# ${newStatus}`;

    // typing animation, unused
    // const editInnerText = () => {...}
    // new TypeIt(`#${id}-js`, {strings: `// ${newStatus}`, speed: 75, startDelete: true, afterComplete: editInnerText}).go();
    // new TypeIt(`#${id}-lua`, {strings: `-- ${newStatus}`, speed: 75, startDelete: true, afterComplete: editInnerText}).go();
    // new TypeIt(`#${id}-py`, {strings: `# ${newStatus}`, speed: 75, startDelete: true, afterComplete: editInnerText}).go();
}

// adjusts size of progress bar based on screen breakpoints
function resizeSpotifyProgress() {
    const screenSize = document.documentElement.clientWidth;
    if (screenSize < 768) {
        spotifySize = 10;
        progressLabelEnabled = false;
    } else if (spotifySize < 1280) {
        spotifySize = 17;
        progressLabelEnabled = true;
    } else if (spotifySize <= 1920) {
        spotifySize = 25;
        progressLabelEnabled = true;
    } else {
        spotifySize = 30;
        progressLabelEnabled = true;
    }
}

// runs every second (checks if spotify is enabled)
function spotifyProgressInterval() {
    if (!spotifyEnabled) return document.querySelector(`#progressBar-${currentLang}`).hidden = true;

    // show the spotify progress bar
    document.querySelector(`#progressBar-${currentLang}`).hidden = false;

    // calculate how far we are through the song
    const currentTime = Date.now();
    const { start, end } = spotifyTimestamps;
    const elapsed = Math.max(0, Math.min((currentTime - start) / 1000, (end - start) / 1000));
    const total = (end - start) / 1000;

    // get the percentage and figure out the hyphen ratio
    const progressPercent = elapsed / total;
    const hyphens = Math.floor(progressPercent * spotifySize);
    const spaces = spotifySize - hyphens - 1;

    // format the timestamps nicely!
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    }

    const elapsedTime = formatTime(elapsed);
    const totalTime = formatTime(total);

    // this won't show if user is on mobile
    let prefix = "";
    if (progressLabelEnabled) prefix = "progress = ";

    // decoded URL format because utf-8 doesn't like the circle icon
    const progressBar = `${prefix}"${elapsedTime} [${"-".repeat(hyphens)}${decodeURIComponent("%E3%85%87")}${"-".repeat(spaces)}] ${totalTime}"`;
    changeStatusText(progressBar, "progressBar", true);
}

setInterval(spotifyProgressInterval, 1000);

// starts the lanyard websocket process
function fetchStatus() {
    const socket = new WebSocket("wss://api.lanyard.rest/socket");
    socket.onopen = () => sendInitMessage(socket);
    socket.onmessage = (event) => handleMessage(event, socket);
    socket.onerror = (error) => console.error("huh websocket error! it's an ", error);
}

function sendInitMessage(socket) {
    socket.send(
        JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "725417693699899534" },
        })
    );
}

function handleMessage(event, socket) {
    const message = JSON.parse(event.data);

    switch (message.op) {
        case 1:
            // heartbeat message every x ms
            setInterval(() => {
                socket.send(JSON.stringify({ op: 3 }));
            }, message.d.heartbeat_interval);
            break;

        case 0:
            if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
                handlePresence(message.d);
            }
            break;

        default:
            console.warn("unhandled opcode:", message.op);
    }
}

// function handling most possible presence cases
function handlePresence(obj) {
    if (obj.listening_to_spotify) {
        spotifyTimestamps = obj.spotify.timestamps;
        spotifyEnabled = true;
        spotifyProgressInterval();
        // convert multiple artist format from semicolon to comma
        return changeStatusText(`i'm currently listening to ${obj.spotify.song} by ${obj.spotify.artist.replaceAll(";", ",")}`);
    } else {
        spotifyEnabled = false;
        document.querySelector(`#progressBar-${currentLang}`).hidden = true;
    }

    if (obj.activities.length > 0) {
        const activity = obj.activities[0];
        if (activity.name === "PyCharm" || activity.name === "WebStorm") {
            return changeStatusText(`i'm currently developing on ${activity.name}`);
        } else if (activity.type === 0) {
            return changeStatusText(`i'm currently playing ${activity.name}`);
        } else {
            return changeStatusText(`i'm currently on ${activity.name}`);
        }
    }

    if (obj.discord_status === "idle") return changeStatusText(`i'm currently idle on discord`);

    if (obj.discord_status !== "offline") {
        if (obj.active_on_discord_web) return changeStatusText("i'm currently on discord web");

        if (obj.active_on_discord_desktop) return changeStatusText("i'm currently on discord desktop");

        if (obj.active_on_discord_mobile) return changeStatusText("i'm currently on discord mobile");

        return changeStatusText("i'm currently on discord");
    }

    changeStatusText("i'm not currently active");
}

document.addEventListener('DOMContentLoaded', fetchStatus);
resizeSpotifyProgress();

// terminal functions, code

// one-liner to generate dates in Wkd Mth DD HH:MM:SS format
// gets rid of year like the login date in the mac terminal
const terminalDate = () => new Date().toLocaleString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
})
    .replace(',', '')
    .replace(/ \d{4},/, "");


const pause = async (t) => await new Promise(r => setTimeout(r, t));

// this whole thing could be better written, but hey it was written in an hour
async function animateTerminal() {
    const login = document.querySelector(".terminal-login");
    const output = document.querySelector(".terminal-output");
    const terminal = document.querySelector(".terminal-div")
    const cursor = document.querySelector(".blink");
    const langCmd = document.querySelector(`.terminal-${currentLang}`);

    document.querySelector(".terminal-date").textContent = `Last login: ${terminalDate()} on ttys003`

    // hide all terminal outputs
    login.classList.add("hidden");
    output.classList.add("hidden");
    cursor.classList.add("hidden");
    ["js", "lua", "py"].forEach((lang) =>
        document.querySelector(`.terminal-${lang}`).classList.add("hidden")
    );

    // slowly show each component of the terminal
    terminal.style.opacity = "1";
    terminal.classList.remove("hidden");
    await pause(500);

    login.classList.remove("hidden");
    await pause(500);

    langCmd.classList.remove("hidden");
    cursor.classList.remove("hidden");
    await pause(1250);

    cursor.classList.add("hidden");
    output.classList.remove("hidden");
}

const hideTerminal = () => {
    document.querySelector(".terminal-div").style.opacity = "0";
    document.querySelector(".terminal-div").classList.remove("hidden");
}

document.querySelector(".terminal-start").addEventListener("click", animateTerminal);
document.querySelector(".terminal-close").addEventListener("click", hideTerminal);
