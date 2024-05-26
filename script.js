const api = 'https://kitsu.io/api/edge/anime?filter[text]='
const cards = document.querySelector('.cards')

let card = ''
fetch(api)
    .then(res => {
        if (!res.ok) {
            throw new Error('API URL is incorrect or the server is down.');
        }
        return res.json()
    })
    .then(dataAnime => {
        let animeData = dataAnime.data
        if (animeData.length === 0) {
            throw new Error('No anime found.');
        }
        animeData.forEach(anime => {
            card += `<div class="card" data-id="${anime.id}">
            <a href="detail.html?id=${anime.id}"><img src="${anime.attributes.posterImage.tiny}" alt=""></a>
            <a href="detail.html?id=${anime.id}">${anime.attributes.slug}</a>
        </div>`
        })
        cards.innerHTML = card
    })
    .catch(error => {
        cards.innerHTML = `<p>Error: ${error.message}</p>`;
    });

const inputField = document.querySelector('.input')
inputField.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
        try {
            const keyword = inputField.value
            document.body.style.backgroundAttachment = 'fixed';
            await getAnime(keyword)
        } catch (err) {
            console.error(err)
        }
    }
})

async function getAnime(keyword) {
    card = ''
    try {
        const response = await fetch(api + keyword)
        if (!response.ok) {
            throw new Error('Failed to fetch anime data.');
        }
        const data = await response.json()
        if (data.data.length === 0) {
            throw new Error('No anime found for the given keyword.');
        }
        const animeData = data.data
        animeData.forEach(a => {
            let id = a.id
            let title = a.attributes.slug
            let poster = a.attributes.posterImage.tiny
            showCard(id, title, poster)
        })
    } catch (error) {
        const container = document.querySelector('.container')
        container.innerHTML = ` 
        <img src="notfound.png" alt="" width="80%">
        `;
    }
}

function showCard(id, title, poster) {
    card += `<div class="card" data-id="${id}">
        <a href="detail.html?id=${id}"><img src="${poster}" alt=""></a>
        <a href="detail.html?id=${id}"><p>${title}</p></a>
    </div>`
    cards.innerHTML = card
}
