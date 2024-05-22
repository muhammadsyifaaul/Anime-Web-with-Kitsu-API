document.addEventListener('DOMContentLoaded', function() {
    getId();
})

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function getId() {
    const animeId = getQueryParameter('id')
    getAnimeData(animeId)
}

function getAnimeData(id) {
    fetch('https://kitsu.io/api/edge/anime/' + id)
       .then(res => res.json())
       .then(res => {
           let animeData = res.data;
           const desc = animeData.attributes.synopsis;
           const type = animeData.attributes.showType;
           const eps = animeData.attributes.episodeCount;
           const rating = animeData.attributes.ageRatingGuide;
           const status = animeData.attributes.status;
           const genres = animeData.relationships.genres.links.related;
           const bg = animeData.attributes.coverImage ? animeData.attributes.coverImage.original : null; 
           const poster = animeData.attributes.posterImage.small;

           fetch(genres)
               .then(res => res.json())
               .then(genreData => {
                   let genreList = genreData.data.map(genre => genre.attributes.name).join(',');
                   showAnmData(type, eps, genreList, status, rating);
                   showDes(desc);
               })
               .catch(e => console.error('Failed to fetch genre data:', e));

           changeImg(bg, poster);
       })
       .catch(e => {
           console.error(e)
       });
}


function showDes(desc) {
     let data = desc
    const description = document.querySelector('.anime-description');
    description.innerHTML = data
}

function showAnmData(...dataAnime) {
    const [type,eps,genreList,status,rating] = dataAnime
    let data = `
    <li>Type: ${type}</li>
            <li>Episode: ${eps}</li>
            <li>Genre: ${genreList}</li>
            <li>Status: ${status}</li>
            <li>Rating: ${rating}</li>`
    const animeData = document.querySelector('.data-anime')
    animeData.innerHTML= data
}
function changeImg(bg, poster) {
    const body = document.body
    if (bg) {
        
        body.style.background = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`;
        body.style.backgroundRepeat = 'no-repeat'
        body.style.backgroundSize = 'cover' 
        body.style.backgroundAttachment = 'fixed'
    } else {
        body.style.background = 'url(bg.png)';
        body.style.backgroundRepeat = 'no-repeat'
        body.style.backgroundSize = 'cover' 
        body.style.backgroundAttachment = 'fixed'
    }

    const img = document.querySelector('.image img');
    img.setAttribute('src', poster);
}
