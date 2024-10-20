import React, { useEffect, useState } from 'react';
import "../styles/PokemonList.css";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
      });
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(
        pokemonList.map((pokemon) =>
          fetch(pokemon.url)
            .then((response) => response.json())
        )
      );
      setPokemonDetails(details);
    };

    if (pokemonList.length > 0) {
      fetchDetails();
    }
  }, [pokemonList]);

  return (
    <div className="pokemon-list-container">
      <h1>151 Pokemon</h1>
      <div className="pokemon-grid">
        {pokemonDetails.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Base Experience: {pokemon.base_experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
