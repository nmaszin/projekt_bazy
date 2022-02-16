import React from 'react';
import '../styles/Tabele.css'
import TabelaWrapper from '../components/TabelaWrapper';
import PermissionsChecker from '../components/PermissionsChecker';
import '../styles/Raporty.css'

export const RaportyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele</h1>
    </div>
  );
};

export const StudenciT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Imie',
      value: 'firstName',
      type: 'text'
    },
    {
      label: 'Nazwisko',
      value: 'lastName',
      type: 'text'
    }
  ]

  return(
    <div className='students'>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='students' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const PracownicyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/pracownicy</h1>
    </div>
  );
};

export const WydzialyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa Wydziału',
      value: 'name',
      type: 'text'
    },
    {
      label: 'Adres',
      value: 'address',
      type: 'text'
    }
  ]

  return(
    <div className='faculties'>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='faculties' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const UczelniaT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/uczelnia</h1>
    </div>
  );
};

export const ZakladyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/zaklady</h1>
    </div>
  );
};

export const WynagrodzeniaT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/wynagrodzenia</h1>
    </div>
  );
};

export const Dane_osoboweT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/dane_osobowe</h1>
    </div>
  );
};

export const KierunkiT = () => {

  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa',
      value: 'name',
      type: 'text'
    },
    {
      label: 'Wydział',
      path: 'faculties',
      name: data => data.name,
      value: 'facultyId',
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/kierunki</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='subjects' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const OpiekunowieT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/opiekunowie</h1>
    </div>
  );
};

export const PrzedmiotyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/przedmioty</h1>
    </div>
  );
};

export const ProwadzacyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/prowadzacy</h1>
    </div>
  );
};

export const AkademikiT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/akademiki</h1>
    </div>
  );
};

export const PokojeT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/pokoje</h1>
    </div>
  );
};

export const PietraT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/pietra</h1>
    </div>
  );
};

export const MieszkancyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele/mieszkancy</h1>
    </div>
  );
};