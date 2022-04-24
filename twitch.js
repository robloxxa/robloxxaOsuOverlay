const twitch = new tmi.Client({ channels: ['robloxxa'] })
const scrollObserver = new ResizeObserver(e => { e[0].target.scrollTop = e[0].target.scrollHeight })
let badges = ""

twitch.connect()
    .then(async () => {
        badges = await fetch('https://badges.twitch.tv/v1/badges/global/display').then(r => r.json())
    })
    .catch(console.error)

twitch.on('message', (channel, tags, message, self) => {
    if (self) return
    let badges = parseBadges(tags)
    let ctnMsg = document.createElement("div")
    ctnMsg.classList.add("ctn-message")
    ctnMsg.innerHTML = `
        ${badges.join('')}<span class="username" style="color: ${tags.color};">${tags['display-name']}</span>: <span class="message">${message}</span>
    `
    ctnChatInner.appendChild(ctnMsg)
    ctnChat.scrollTop = ctnChat.scrollHeight
})

function parseBadges(tags) {
	try {
	    if (!badges) return ["",""]
		let arr = []
		for (let [key, value] of Object.entries(tags['badges'])) {
			if (!badges.badge_sets[key].versions[value]) continue
			arr.push(`<img class="badge" src="${badges.badge_sets[key].versions[value]['image_url_1x']}">`)
    }
    return arr

	} catch(e) {
		return []
	}
}

scrollObserver.observe(ctnChat)