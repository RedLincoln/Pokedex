const pokemonUrl = 'http://localhost:8081/pokemon/'
const apiUrl = 'http://localhost:8081/pokemon/api/'
const pokeAnchors = document.getElementsByClassName('poke-anchor')
const pokeNavToggle = document.getElementById('toggle-poke-nav')
const pokeNav = document.getElementById('poke-nav-list')
const re = /\/pokemon\/([A-Z0-9-]+)/i

let activeAnchor

const togglePokeNav = (event) => {
    pokeNav.classList.toggle('width-0')
}


const dontRender = (event) => {
    history.pushState(null, '', `${pokemonUrl}${event.target.innerHTML}`)
    event.target.classList.add('active')
    activeAnchor && activeAnchor.classList.remove('active')
    activeAnchor = event.target
    showPokemonInfo(`${apiUrl}${activeAnchor.innerHTML}`)
}

const showPokemonInfo = (url) => {
    fetch(url).then(res => res.json()).then(pokemon => {
        const dataInfo = document.getElementById('poke-info')
        const dataContainer = document.getElementById('poke-container')
        if (dataInfo){
            dataContainer.removeChild(dataInfo)
        }
        dataContainer.appendChild(nodeInfoConstructor(pokemon))
    })
}

const setColorTypes = (colorElements) => {
    const size = 18
    const margin = 3
    for (let i = 0; i < colorElements.length; i++){
        colorElements.item(i).style.marginRight = `${size * i + (i + 1) * margin}px`
    }
}

for (let i = 0; i < pokeAnchors.length; i++){
    const anchor = pokeAnchors.item(i)
    anchor.addEventListener('click', dontRender)
    setColorTypes(document.getElementsByClassName(`${anchor.innerHTML}-color`))
    const pokeMatch = window.location.pathname.match(re)
    if (!activeAnchor && pokeMatch && anchor.innerHTML === pokeMatch[1]){
        anchor.classList.add('active')
        activeAnchor = anchor
        showPokemonInfo(`${apiUrl}${activeAnchor.innerHTML}`)
    }
}



const nodeInfoConstructor = (pokemon) => {
    const pokeInfo = document.createElement('div')
    pokeInfo.setAttribute('id', 'poke-info')
    pokeInfo.innerHTML = `<h3>${pokemon.name}</h3>
                          <img src='${pokemon.frontImage}' alt='[icon]'>
                          <ul id='row-display'>
                            ${pokemon.types.map((type) => `<li data-type=${type}>${type}</li>`).join('')}
                          </ul>
                          <b>Stats</b>
                          <ul>
                            ${pokemon.stats.map((stat) => `<li><b>${stat.name}</b>: ${stat.value}</li>`).join('')}
                          </ul>
                          `

    return pokeInfo
}


pokeNavToggle.addEventListener('click', togglePokeNav)