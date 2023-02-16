import React, { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import { useState } from 'react';
import { Card, Container, Form, InputGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;
const pokeImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",';

function App() {

  const [rawPokemon, setRawPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const fetchPokemon = async () => {
    const response = await fetch(pokeApi)
    const data = await response.json()

    const newPokemon = [];
    for(let i = 0; i < data.results.length; i++){
      const response2 = await fetch(data.results[i].url);
      const data2 = await response2.json();

      newPokemon.push(data2)
    }
    
    setRawPokemon(newPokemon);
    setFilteredPokemon(rawPokemon);
  };

  useEffect(()=>{
    fetchPokemon()
  },[])

  function handleChange(e) {
    const value = e.target.value;
    const regex = new RegExp(value,'gi');
    const filtered = rawPokemon.filter((pokemon)=> {
      return pokemon.name.match(regex)
    });

    setFilteredPokemon(filtered)
  };


  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup  style={{paddingLeft:'40%', paddingRight:'40%'}} onChange={handleChange} >
        <Form.Control placeholder='Search Pokemon' onChange={this.handleChange}/>
      </InputGroup>


      <div className='d-flex flex-lg-wrap justify-content-center mb-3'>
      {filteredPokemon.map(pokemon => <PokemonCard url={pokemon.sprites.front_default} name={pokemon.name} abilities={pokemon.abilities}/>)}
      </div>
    </div>
  );
}

export { App };
