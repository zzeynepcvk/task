import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Table from './components/Table';
import CharacterDetails from './components/CharacterDetails';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ name: '', status: '', species: '' }); // Çoklu filtre

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const totalPages = 42; // API'deki toplam sayfa sayısı
        const requests = Array.from({ length: totalPages }, (_, i) =>
          axios.get(`https://rickandmortyapi.com/api/character?page=${i + 1}`)
        );

        const responses = await Promise.all(requests);
        const allCharacters = responses.flatMap((res) => res.data.results);

        setCharacters(allCharacters);
        setFilteredData(allCharacters);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = characters;

    // İsim filtresi
    if (filters.name) {
      filtered = filtered.filter((character) =>
        character.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Durum filtresi
    if (filters.status) {
      filtered = filtered.filter(
        (character) => character.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    // Tür filtresi
    if (filters.species) {
      filtered = filtered.filter(
        (character) => character.species.toLowerCase() === filters.species.toLowerCase()
      );
    }

    setFilteredData(filtered);

    setSelectedCharacter(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters]); // Filtreler değiştiğinde filtreleri uygula

  return (
    <div>
      <h1>Rick and Morty Karakter Tablosu</h1>

      <div>
        <input
          type="text"
          placeholder="İsme göre filtrele"
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
        <select
          onChange={(e) => handleFilterChange('status', e.target.value)}
          defaultValue=""
        >
          <option value="">Durum (Tümü)</option>
          <option value="Alive">Yaşıyor</option>
          <option value="Dead">Ölü</option>
          <option value="unknown">Bilinmiyor</option>
        </select>
        <input
          type="text"
          placeholder="Tür filtrele (örn. Human)"
          onChange={(e) => handleFilterChange('species', e.target.value)}
        />
      </div>

      {error && <p>{error}</p>}
      {loading ? (
        <p>Yükleniyor...</p>
      ) : filteredData.length > 0 ? (
        <Table data={filteredData} onRowClick={setSelectedCharacter} />
      ) : (
        <p>Hiçbir sonuç bulunamadı.</p>
      )}

      {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
    </div>
  );
};

export default App;
