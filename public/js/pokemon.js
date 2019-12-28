const pokemonUrl = 'http://localhost:8081/pokemon/'
const pokeAnchors = document.getElementsByClassName('poke-anchor')
const re = /\/pokemon\/([A-Z0-9-]+)/i

let activeAnchor

const dontRender = (event) => {
    history.pushState(null, '', `${pokemonUrl}${event.target.innerHTML}`)
    event.target.classList.add('active')
    activeAnchor && activeAnchor.classList.remove('active')
    activeAnchor = event.target
}

for (let i = 0; i < pokeAnchors.length; i++){
    pokeAnchors.item(i).addEventListener('click', dontRender)
    const pokeMatch = window.location.pathname.match(re)
    if (!activeAnchor && pokeMatch && pokeAnchors.item(i).innerHTML === pokeMatch[1]){
        pokeAnchors.item(i).classList.add('active')
        activeAnchor = pokeAnchors.item(i)
        history.replaceState(null, null, `${pokemonUrl}${activeAnchor.innerHTML}`)
        window.scrollTo(0, activeAnchor.offsetHeight * i)
    }
}

