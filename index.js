const socket = new ReconnectingWebSocket("ws://" + "localhost:24050" + "/ws");
const ctnGameplay = document.getElementById("ctn-counter")
const score = document.getElementById("score")
const progress = document.getElementById("progress")
const lifebar = document.getElementById("lifebar")
const acc = document.getElementById("acc")
const combo = document.getElementById("combo")
const pp = document.getElementById("pp")
const mods = document.getElementById("mods")
const grade = document.getElementById("grade")
const h100 = document.getElementById("h100")
const h50 = document.getElementById('h50')
const h0 = document.getElementById('h0')
const hsb = document.getElementById('hSB')
const title = document.getElementsByClassName("np-text")
const ctnChat = document.getElementById("ctn-chat")
const ctnChatInner = document.getElementById("ctn-chat-inner")

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.error(error);
};

let data = {
    "settings": {
        "showInterface": true,
        "folders": {
            "game": "D:\\Games\\osu!",
            "skin": "tranquil sublimity",
            "songs": "D:\\Games\\osu!\\Songs"
        }
    },
    "menu": {
        "mainMenu": {
            "bassDensity": 0
        },
        "state": 2,
        "gameMode": 0,
        "isChatEnabled": 0,
        "bm": {
            "time": {
                "firstObj": 232,
                "current": -1445,
                "full": 226857,
                "mp3": 230108
            },
            "id": 1580705,
            "set": 750689,
            "md5": "9149d39b64bba11d21bfaa13598fca58",
            "rankedStatus": 2,
            "metadata": {
                "artist": "Undead Corporation",
                "artistOriginal": "Undead Corporation",
                "title": "Artificial Sorrow (Off Vocal)",
                "titleOriginal": "Artificial Sorrow (Off Vocal)",
                "mapper": "Cloz1k",
                "difficulty": "Demon's Sorrow of Lye Oreleano"
            },
            "stats": {
                "AR": 9.7,
                "CS": 4.1,
                "OD": 9,
                "HP": 4.1,
                "SR": 7.14,
                "BPM": {
                    "min": 240,
                    "max": 240
                },
                "maxCombo": 2298,
                "fullSR": 7.14,
                "memoryAR": 9.7,
                "memoryCS": 4.1,
                "memoryOD": 9,
                "memoryHP": 4.1
            },
            "path": {
                "full": "750689 Undead Corporation - Artificial Sorrow (Off Vocal)\\death-note-ryuk-movie-wallpaper-2.jpg",
                "folder": "750689 Undead Corporation - Artificial Sorrow (Off Vocal)",
                "file": "Undead Corporation - Artificial Sorrow (Off Vocal) (Cloz1k) [Demon's Sorrow of Lye Oreleano].osu",
                "bg": "death-note-ryuk-movie-wallpaper-2.jpg",
                "audio": "audio.mp3"
            }
        },
        "mods": {
            "num": 0,
            "str": "NM"
        },
        "pp": {
            "100": 584,
            "99": 539,
            "98": 506,
            "97": 482,
            "96": 464,
            "95": 449,
            "strains": []
        }
    },
    "gameplay": {
        "gameMode": 0,
        "name": "robloxxa",
        "score": 0,
        "accuracy": 100,
        "combo": {
            "current": 0,
            "max": 0
        },
        "hp": {
            "normal": 200,
            "smooth": 0
        },
        "hits": {
            "300": 0,
            "geki": 0,
            "100": 0,
            "katu": 0,
            "50": 0,
            "0": 0,
            "sliderBreaks": 0,
            "grade": {
                "current": "",
                "maxThisPlay": ""
            },
            "unstableRate": 0,
            "hitErrorArray": null
        },
        "pp": {
            "current": 0,
            "fc": 0,
            "maxThisPlay": 0
        },
        "keyOverlay": {
            "k1": {
                "isPressed": false,
                "count": 0
            },
            "k2": {
                "isPressed": false,
                "count": 0
            },
            "m1": {
                "isPressed": false,
                "count": 0
            },
            "m2": {
                "isPressed": false,
                "count": 0
            }
        },
        "leaderboard": {
            "hasLeaderboard": true,
            "isVisible": false,
            "ourplayer": {
                "name": "robloxxa",
                "score": 0,
                "combo": 0,
                "maxCombo": 0,
                "mods": "NM",
                "h300": 0,
                "h100": 0,
                "h50": 0,
                "h0": 0,
                "team": 0,
                "position": 0,
                "isPassing": 0
            },
            "slots": [
                {
                    "name": "robloxxa",
                    "score": 29402738,
                    "combo": 0,
                    "maxCombo": 1182,
                    "mods": "NM",
                    "h300": 1490,
                    "h100": 46,
                    "h50": 0,
                    "h0": 2,
                    "team": 0,
                    "position": 1,
                    "isPassing": 1
                }
            ]
        }
    },
    "resultsScreen": {
        "name": "",
        "score": 0,
        "maxCombo": 0,
        "mods": {
            "num": 0,
            "str": ""
        },
        "300": 0,
        "geki": 0,
        "100": 0,
        "katu": 0,
        "50": 0,
        "0": 0
    }
}
let tempState,
    tempPP,
    tempTitle

const animation = {
    score: new CountUp('score', 0, 0, 0, 0, { useEasing: true, useGrouping: true, separator: "", formattingFn: n => n.toString().padStart(8, '0')}),
}

const visualWrapper = document.createElement("div")
const visual = document.createElement("div")

visualWrapper.classList.add("wrapper")
visual.classList.add("visual")
visualWrapper.appendChild(visual)

const k1 = new Key({keyField: document.getElementById("key1"), wrapper: visualWrapper, ctnVisual: document.getElementById("k1Visual"), speed: 0.3})
const k2 = new Key({keyField: document.getElementById("key2"), wrapper: visualWrapper, ctnVisual: document.getElementById("k2Visual"), speed: 0.3})

socket.onmessage = event => {
    data = JSON.parse(event.data)
    const npTitle = `${data.menu.bm.metadata.artist} - ${data.menu.bm.metadata.title} [${data.menu.bm.metadata.difficulty}] (by ${data.menu.bm.metadata.mapper})`
    if (data.menu.state !== tempState) {
        tempState = data.menu.state
        switch(tempState) {
            case 2: {
                enableElement(ctnGameplay)
                break
            }
            default: {
                disableElement(ctnGameplay)
            }
        }
    }

    k1.update(data.gameplay.keyOverlay.k1.isPressed)
    k2.update(data.gameplay.keyOverlay.k2.isPressed)

    if (data.gameplay.score > 0) {
        animation.score.update(data.gameplay.score)
    } else score.innerText = "00000000"
    if (data.gameplay.accuracy > 0) {
        acc.innerText = data.gameplay.accuracy.toFixed(2) + "%"
    } else acc.innerText = "100.00%"

    if (data.gameplay.hits.grade.current.length > 0)  {
        grade.innerText = data.gameplay.hits.grade.current
    } else grade.innerText = ""

    if (data.gameplay.hits["100"] > 0) {
        h100.innerText = data.gameplay.hits["100"]
    } else h100.innerText = 0

    if (data.gameplay.hits["50"] > 0) {
        h50.innerText = data.gameplay.hits["50"]
    } else h50.innerText = 0

    if (data.gameplay.hits["0"] > 0) {
        h0.innerText = data.gameplay.hits["0"]
    } else h0.innerText = 0

    if (data.gameplay.hits.sliderBreaks > 0) {
        hsb.innerText = data.gameplay.hits.sliderBreaks
    } else hsb.innerText = 0

    if (data.gameplay.combo.current > 0) {
        combo.innerText = data.gameplay.combo.current+"x"
    } else combo.innerText = 0+"x"

    if (data.gameplay.pp.current > 0) {
        pp.innerText = data.gameplay.pp.current+"pp"
    } else pp.innerText = 0+"pp"

    if (data.menu.mods.str.length > 0) {
        mods.innerText = data.menu.mods.str
    } else mods.innerText = ""

    if (data.menu.bm.time.current >= data.menu.bm.time.firstObj
        &&
        data.menu.bm.time.current <= data.menu.bm.time.full
    ) {
        let percent = ((data.menu.bm.time.current - data.menu.bm.time.firstObj) / (data.menu.bm.time.full - data.menu.bm.time.firstObj))
        progress.style.strokeDashoffset = percent > 1 ? 0 : 628 - (percent * 628)
    } else progress.style.strokeDashoffset = 0

    if (data.gameplay.hp.smooth !== 0) {
        lifebar.style.strokeDashoffset = 565 - (data.gameplay.hp.smooth / 200 * 565)
    } else lifebar.style.strokeDashoffset = 0

    if (npTitle !== tempTitle) {
        tempTitle = npTitle
        for (let el of title) {
            el.innerHTML = tempTitle
        }
    }

}

function disableElement(selectedElement){
    selectedElement.classList.add('animationDisplayNone');
    selectedElement.classList.remove('animationDisplay');
}

function enableElement(selectedElement) {
    selectedElement.classList.remove('animationDisplayNone');
    selectedElement.classList.add('animationDisplay');
}