// made by bestspyboy, 2025 :)
// licensed under MIT, full details in LICENSE

let currentLang = "js"
const elements = ["startingLine", "endingLine", "openingComment", "codeBlock"]

// iterates over each language
function changeLang(newLang) {
    elements.forEach((element) => {
        document.querySelector(`#${element}-${currentLang}`).hidden = true
    })

    elements.forEach((element) => {
        document.querySelector(`#${element}-${newLang}`).hidden = false
    })

    currentLang = newLang
}

function changeStatusText(newStatus) {
    document.querySelector("#openingComment-js").innerText = `// ${newStatus}`
    document.querySelector("#openingComment-lua").innerText = `-- ${newStatus}`
    document.querySelector("#openingComment-py").innerText = `# ${newStatus}`
}

function fetchStatus() {
    const socket = new WebSocket("wss://api.lanyard.rest/socket")
    socket.onopen = () => sendInitMessage(socket)
    socket.onmessage = (event) => handleMessage(event, socket)
    socket.onerror = (error) => console.error("huh websocket error! it's an ", error)
}

function sendInitMessage(socket) {
    socket.send(
        JSON.stringify({
            op: 2,
            d: { subscribe_to_id: "725417693699899534" },
        })
    )
}

function handleMessage(event, socket) {
    const message = JSON.parse(event.data)

    switch (message.op) {
        case 1:
            // heartbeat message every x ms
            setInterval(() => {
                socket.send(JSON.stringify({ op: 3 }))
            }, message.d.heartbeat_interval)
            break

        case 0:
            if (message.t === "INIT_STATE" || message.t === "PRESENCE_UPDATE") {
                handlePresence(message.d)
            }
            break

        default:
            console.warn("Unhandled opcode:", message.op)
    }
}

// function handling most possible presence cases
function handlePresence(obj) {
    if (obj.listening_to_spotify) {
        return changeStatusText(`i'm currently listening to ${obj.spotify.song} by ${obj.spotify.artist}`)
    }

    if (obj.activities.length > 0) {
        const activity = obj.activities[0]
        if (activity.type === 0) {
            return changeStatusText(`i'm currently playing ${activity.name}`)
        } else {
            return changeStatusText(`i'm currently on ${activity.name}`)
        }
    }

    if (obj.discord_status === "idle") {
        console.log("idle")
        return changeStatusText(`i'm currently idle on discord`)
    }

    if (obj.discord_status !== "offline") {
        if (obj.active_on_discord_web) {
            return changeStatusText("i'm currently on discord web")
        }

        if (obj.active_on_discord_desktop) {
            return changeStatusText("i'm currently on discord desktop")
        }

        if (obj.active_on_discord_mobile) {
            return changeStatusText("i'm currently on discord mobile")
        }

        return changeStatusText("i'm currently on discord")
    }

    changeStatusText("i'm not currently active")
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStatus()
})