const pokemonUrl = 'http://localhost:8081/pokemon/'
const apiUrl = 'http://localhost:8081/pokemon/api/'
const pokeAnchors = document.getElementsByClassName('poke-anchor')
const re = /\/pokemon\/([A-Z0-9-]+)/i

let activeAnchor

const dontRender = (event) => {
    history.pushState(null, '', `${pokemonUrl}${event.target.innerHTML}`)
    event.target.classList.add('active')
    activeAnchor && activeAnchor.classList.remove('active')
    activeAnchor = event.target
    fetch(`${apiUrl}${activeAnchor.innerHTML}`).then(res => res.json()).then(pokemon => {
        const dataInfo = document.getElementById('poke-info')
        const dataContainer = document.getElementById('poke-container')
        if (dataInfo){
            dataContainer.removeChild(dataInfo)
        }
        dataContainer.appendChild(nodeInfoConstructor(pokemon))
    })
}

for (let i = 0; i < pokeAnchors.length; i++){
    pokeAnchors.item(i).addEventListener('click', dontRender)
    const pokeMatch = window.location.pathname.match(re)
    if (!activeAnchor && pokeMatch && pokeAnchors.item(i).innerHTML === pokeMatch[1]){
        pokeAnchors.item(i).classList.add('active')
        activeAnchor = pokeAnchors.item(i)
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
