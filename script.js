const api = 'https://kitsu.io/api/edge/anime?filter[text]='
const cards = document.querySelector('.cards')
let card = ''
fetch(api)
.then(res => res.json())
.then(dataAnime => {
    let animeData = dataAnime.data 
    animeData.forEach(anime => {
        card += `<div class="card" data-id="${anime.id}>
        <a href="detail.html?id=${anime.id}"><img src="${anime.attributes.posterImage.tiny}" alt=""></a>
        <a href="detail.html?id=${anime.id}">${anime.attributes.slug}</a>
    </div>`
    })
    cards.innerHTML = card
})
const inputField = document.querySelector('.input')
inputField.addEventListener('keydown', function(e) {
    if(e.key == 'Enter') {
        const keyword = inputField.value
        document.body.style.backgroundAttachment= 'fixed';
        getAnime(keyword)
        
    }
})

function getAnime(keyword) {
    card = ''
    fetch(api+keyword)
        .then(response => response.json()
        .then(animeData => {
            
            let data = animeData.data;
            data.forEach(a => {
                let title = a.attributes.slug;
                let poster = a.attributes.posterImage.tiny;
                showCard(a.id,title,poster)
            })
            
        })
        .catch(e => alert('ada masalah'))
        
    )
}

function showCard(...data) {
    const [id,title, poster] = data
    card += `<div class="card" data-id="${id}>
        <a href="detail.html?id=${id}"><img src="${poster}" alt=""></a>
        <a href="detail.html?id=${id}"><p>${title}</p></a>
    </div>`
    cards.innerHTML = card
    
}


