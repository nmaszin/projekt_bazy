import React from 'react';
import '../styles/Tabele.css'
import { useState, useEffect } from 'react';
import Raport from '../components/Raport';
import config from '../config'
import TabelaWrapper from '../components/TabelaWrapper';
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
      value: data => data.id,
      type: 'immutable'
    },
    {
      label: 'Imie',
      value: data => data.firstName,
      type: 'text'
    },
    {
      label: 'Nazwisko',
      value: data => data.lastName,
      type: 'text'
    }
  ]

  return(
    <div className='students'>
      <TabelaWrapper path='students' columns={c} />
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
  return (
    <div className='reports'>
      <h1>Tabele/wydzialy</h1>
    </div>
  );
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
      value: data => data.id,
      type: 'immutable'
    },
    {
      label: 'Nazwa',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Wydział',
      path: 'faculties',
      name: data => data.name,
      value: data => data.facultyId,
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <TabelaWrapper path='subjects' columns={c} />
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