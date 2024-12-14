import React from 'react';

const CharacterDetails = ({ character }) => {
  return (
    <div>
      <h2>Detaylar</h2>
      <p><strong>İsim:</strong> {character.name}</p>
      <p><strong>Durum:</strong> {character.status}</p>
      <p><strong>Tür:</strong> {character.species}</p>
      <p><strong>Konum:</strong> {character.location.name}</p>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterDetails;
