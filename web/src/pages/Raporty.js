import React from 'react';
import RaportWrapper from '../components/RaportWrapper';
import PermissionsChecker from '../components/PermissionsChecker';
import '../styles/Raporty.css'

export const RaportyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty</h1>
    </div>
  );
};

export const StudenciR = () => {


  const c = [
    {
      label: 'Identyfikator',
      value: data => data.id,
      type: 'immutable'
    },
    {
      label: 'Imie',
      path: 'people',
      name: data => data.firstName,
      value: data => data.personId,
      type: 'list'
    },
    {
      label: 'Nazwisko',
      path: 'people',
      name: data => data.lastName,
      value: data => data.personId,
      type: 'list'
    }
  ]

  return(
    <div className='students'>
      <h1>Raporty/studenci</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='students' columns={c} />
      </PermissionsChecker>
    </div>
  )

};

export const PracownicyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/pracownicy</h1>
    </div>
  );
};

export const WydzialyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/wydzialy</h1>
    </div>
  );
};

export const UczelniaR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/uczelnia</h1>
    </div>
  );
};

export const ZakladyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/zaklady</h1>
    </div>
  );
};

export const WynagrodzeniaR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/wynagrodzenia</h1>
    </div>
  );
};

export const Dane_osoboweR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/dane_osobowe</h1>
    </div>
  );
};

export const KierunkiR = () => {

  const c = [
    {
      label: 'Identyfikator',
      value: data => data.id,
      type: 'immutable'
    },
    {
      label: 'Nazwa kierunku',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Nazwa wydziału',
      value: data => data.facultyId,
      name: data => data.name,
      path: 'faculties',
      type: 'list'
    }
  ]

  return (
    <div className='reports'>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='subjects' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const OpiekunowieR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/opiekunowie</h1>
    </div>
  );
};

export const PrzedmiotyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/przedmioty</h1>
    </div>
  );
};

export const ProwadzacyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/prowadzacy</h1>
    </div>
  );
};

export const AkademikiR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/akademiki</h1>
    </div>
  );
};

export const PokojeR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/pokoje</h1>
    </div>
  );
};

export const PietraR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/pietra</h1>
    </div>
  );
};

export const MieszkancyR = () => {
  return (
    <div className='reports'>
      <h1>Raporty/mieszkancy</h1>
    </div>
  );
};