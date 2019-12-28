const express = require('express')
const fetch = require('node-fetch')
const flatCache = require('flat-cache')

const cache = flatCache.load('PokemonsCache')
const router = express.Router()

router.get('/', getPokemons,(req, res) => {
    try {
        res.render('index', {
            pokemons: req.pokemons
        })
    }catch(err){
        console.log(err)
    }
})

async function getPokemons(req, res, next) {
    const url = 'https://pokeapi.co/api/v2/pokemon/'
    try {
        const response = await fetch(url)
        const json = await response.json()   
        if (!checkPokeCache(json.count)){
            await storePokeInCache(`${url}?limit=${json.count}`)
        }
        req.pokemons = cache.getKey('pokemons')
    }catch(err){
        console.log(err)
    }
    next()
}

function checkPokeCache(count) {
    return count === cache.getKey('count')
}

async function storePokeInCache(url){
    try{
        const totalResponse = await fetch(`${url}`)
        const allPokemons = await totalResponse.json()
        cache.setKey('count', allPokemons.count)
        const pokeData = await formatPokemons(allPokemons.results)
        cache.setKey('pokemons', pokeData)
        console.log(pokeData)
        cache.save()
    }catch(err){
        console.log(err)
    }
}

async function formatPokemons (pokeResults) {
    let pokemons = []
    await Promise.all(pokeResults.map((pokemon) => fetch(pokemon.url).then((res) => res.json()).then(pokeData => {
        pokemons.push({
            name: pokeData.name,
            types: pokeData.types.map((type) => type.type.name)
        })
    })))
    return pokemons
}


module.exports = router