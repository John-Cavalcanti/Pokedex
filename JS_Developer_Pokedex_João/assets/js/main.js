const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const listaPokemons = document.getElementById('pokemonList')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
            <li class="pokemon ${pokemon.type}">
                

                <div class="detail">
                    
                    <div class ="header">
                        <span class="number">#${pokemon.number}</span>
                        <span class="name">${pokemon.name}</span>
                        <div class="main-details">
                            <ol class="types">
                                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                            </ol>

                            <img src="${pokemon.photo}"
                                alt="${pokemon.name}">
                        </div>
                    </div>

                    <div class="more-details">
                        <h3>Mais detalhes de ${pokemon.name}</h3>
                        <div class="info-extra">
                            <span> XP Base </span>
                            <p>${pokemon.base_xp}</p>
                        </div>

                        <div class="info-extra">
                            <span> Altura </span>
                            <p>${pokemon.height}</p>
                        </div>

                        <div class="info-extra">
                            <span> Peso em hectogramas </span>
                            <p>${pokemon.weight}</p>
                        </div>
                        
                    </div>
                </div>
            </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

listaPokemons.addEventListener('click', function (event) {
    // Check if the clicked element or its ancestor has the class 'pokemon'
    const pokemonItem = event.target.closest('.pokemon');
    
    if (pokemonItem) {
        // Find the details element within the clicked Pokémon item
        const details = pokemonItem.querySelector('.more-details');
        
        // Toggle the 'show' class to change visibility
        details.classList.toggle('show');
    }
});