
const button = document.getElementById("search-button");
const container = document.getElementById("container");
const pokinfo = document.getElementById("pokemon-info");

button.addEventListener("click",async()=>
{
    const searchInput = document.getElementById("search-input").value.trim().toLowerCase();
const url=`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`;
    try{
        const response = await fetch(url);
        if (!response.ok) {
            alert('Pokémon not found');
            return;
        }
        const data = await response.json();
        displayPokemonData(data);
    }
    catch(error)
    {
        alert("Pokemon data not found");
    }
});
function displayPokemonData(data)
{
    const imgElement = document.createElement("img");
    imgElement.id = 'sprite';
    imgElement.src = data.sprites.front_default;
    if (document.getElementById('sprite')) {
        document.getElementById('sprite').replaceWith(imgElement);
    } else {
        pokinfo.appendChild(imgElement);
    }

    document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${data.id}`;
    document.getElementById('weight').textContent = `Weight: ${data.weight}`;
    document.getElementById('height').textContent = `Height: ${data.height}`;
    
    const typesElement = document.getElementById('types');
    typesElement.innerHTML = '';
    data.types.forEach(typeInfo => {
        const typeElement = document.createElement('div');
        typeElement.textContent = typeInfo.type.name.toUpperCase();
        typesElement.appendChild(typeElement);
    });
    
    document.getElementById('hp').textContent = `${data.stats[0].base_stat}`;
    document.getElementById('attack').textContent = ` ${data.stats[1].base_stat}`;
    document.getElementById('defense').textContent = `${data.stats[2].base_stat}`;
    document.getElementById('special-attack').textContent = `${data.stats[3].base_stat}`;
    document.getElementById('special-defense').textContent = `${data.stats[4].base_stat}`;
    document.getElementById('speed').textContent = `${data.stats[5].base_stat}`;
    
    typesElement.style.display="block";
}
