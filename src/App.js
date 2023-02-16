import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {

  const [allPokemon, setAllPokemon] = useState([]);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);

  async function fetchPokemon(){
    const response = await fetch(pokeApi);
    const data = await response.json();
    setAllPokemon(data.results);
    setPokemonFiltered(data.results);
  }
  useEffect(()=>{
    fetchPokemon()
  },[])

  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value, 'gi');
    const filtered = allPokemon.filter((pokemon) => {
      return pokemon.name.match(regex);
    });

    setPokemonFiltered(filtered);
  }


  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup onChange={handleChange} className="mb-3 mx-auto" style={{width: '50rem'}}>
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          placeHolder="Search Pokemon"
          aria-label="Search Pokemon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <h1 className="text-center">PokeVerse</h1>
      <div className="container">
        <div className="row">
          {pokemonFiltered.map((pokemon, idx) => (
            <div className="col-3">
              <PokemonCard 
                key={idx} 
                name={pokemon.name} 
                url={pokemon.url}
                pokemonFiltered={pokemonFiltered}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { App };
