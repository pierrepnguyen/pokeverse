import React from 'react';
import { Card } from 'react-bootstrap';

function PokemonCard({ url, name, abilities }) {

  return (
    <Card className='p-3 m-3' bg='dark' text='success' style={{width:'20rem'}}>
      <Card.Img src={url}/>
      <Card.Title>{name}</Card.Title>
      <br/>
      <Card.Subtitle>Abilities:</Card.Subtitle>
      <br/>
      {abilities.map((ability) => <Card.Text className='px-4'>- {ability.ability.name}</Card.Text>)}
    </Card>
  );
}

export { PokemonCard };
