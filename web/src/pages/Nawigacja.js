import React from 'react';
import '../styles/Nawigacja.css'

const Nawigacja = () => {
  return (
    <div className='home'>
      <h1 className='header'>Witamy w nawigacji strony</h1>

      <p className='text'>
        Projekt będzie wspierał szeroki zakres funkcjonalności pozwalający w podstawowy sposób obsłużyć system
        zarządzania uczelni wyższej w zakresie organizacji studentów i pracowników związanych z uczelnią wyższą.
        System będzie wyposażony w interfejs graficzny umożliwiający interakcje z systemem osobom nie technicznym.
        Interfejs będzie prosty w użytkowaniu i zapewniający wszystkie wymagane funkcjonalności potrzebne
        do całościowej obsługi zagadnienia.
      </p>

      <h2 className='header'>Funkcjonalności jakie będzie wspierał to:</h2>
      <ul className='list'>
          <li>Możliwość dodania/usunięcia nowego studenta/pracownika do bazy</li>
          <li>Edycja danych studentów/pracowników</li>
          <li>Wyszukanie studentów spełniających wybrane kryteria takie jak np: data urodzenia, imię, nazwisko,
              kierunek studiów z możliwością ich posortowania.</li>
          <li>Wspomaganie obsługi na całych zbiorach studentów takich jak cały rok studiów czy grupa dziekańska.</li>
          <li>Dodanie/usunięcie kierunku studiów</li>
          <li>Dodanie/usunięcie/edycja zakładu/wydziału</li>
          <li>System</li>
      </ul>
    </div>
  );
};

export default Nawigacja;
