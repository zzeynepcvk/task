import React, { useState } from 'react';

const Table = ({ data, onRowClick, pageSize }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Sayfa başlangıç ve bitiş indekslerini hesapla
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Durum</th>
            <th>Tür</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((character) => (
              <tr key={character.id} onClick={() => onRowClick(character)}>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Sonuç bulunamadı</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Sayfalandırma kontrolleri */}
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <span>Sayfa {currentPage}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => (prev * pageSize < data.length ? prev + 1 : prev))
          }
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Table;
