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

export const OsobyR = () => {
  const c = [
    {
      label: 'PESEL',
      value: data => data.pesel,
      type: 'text'
    },
    {
      label: 'Imię',
      value: data => data.firstName,
      type: 'text'
    },
    {
      label: 'Nazwisko',
      value: data => data.lastName,
      type: 'text'
    },
    {
      label: 'Adres',
      value: data => data.address,
      type: 'text'
    },
  ]

  return(
    <div className="reports">
      <h1>Raporty/osoby</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='people' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const StudenciR = () => {
  const c = [
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
    },
    {
      label: 'PESEL',
      path: 'people',
      name: data => data.pesel,
      value: data => data.personId,
      type: 'list'
    },
    {
      label: 'Numer albumu',
      value: data => data.identifier,
      type: 'text'
    },
    {
      label: 'Stopień naukowy',
      value: data => data.degree ? data.degree : '',
      type: 'text'
    },
    {
      label: 'Grupa laboratoryjna',
      path: 'groups',
      name: data => data.name,
      value: data => data.groupId,
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Raporty/studenci</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='students' columns={c} />
      </PermissionsChecker>
    </div>
  )

};

export const PracownicyR = () => {
  const c = [
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
    },
    {
      label: 'PESEL',
      path: 'people',
      name: data => data.pesel,
      value: data => data.personId,
      type: 'list'
    },
    {
      label: 'Stopień naukowy',
      value: data => data.degree,
      type: 'text'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/pracownicy</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='employees' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const WydzialyR = () => {
  const c = [
    {
      label: 'Nazwa wydziału',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Adres',
      value: data => data.address,
      type: 'text'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/wydziały</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='faculties' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const ZakladyR = () => {
  const c = [
    {
      label: 'Nazwa zakładu',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Nazwa wydziału',
      path: 'faculties',
      value: data => data.facultyId,
      name: data => data.name,
      type: 'list'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/zakłady</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='laboratories' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const WynagrodzeniaR = () => {
  const c = [
    {
      label: 'Imię',
      path: 'people',
      value: data => data.employeeId,
      name: data => data.firstName,
      type: 'list'
    },
    {
      label: 'Nazwisko',
      path: 'people',
      value: data => data.employeeId,
      name: data => data.lastName,
      type: 'list'
    },
    {
      label: 'PESEL',
      path: 'people',
      value: data => data.employeeId,
      name: data => data.pesel,
      type: 'list'
    },
    {
      label: 'Płaca podstawowa [PLN]',
      value: data => data.baseSalary,
      type: 'text'
    },
    {
      label: 'Premia roczna [PLN]',
      value: data => data.yearBonus,
      type: 'text'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/wynagrodzenia</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='salaries' columns={c} />
      </PermissionsChecker>
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
      <h1>Raporty/kierunki</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='subjects' columns={c} />
      </PermissionsChecker>
    </div>
  );
};


export const PrzedmiotyR = () => {
  const c = [
    {
      label: 'Nazwa przedmiotu',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Numer semestru',
      value: data => data.semesterId,
      name: data => data.number,
      path: 'semesters',
      type: 'list'
    },
    {
      label: 'Rok akademicki',
      value: data => data.semesterId,
      name: data => `${data.year}/${data.year + 1}`,
      path: 'semesters',
      type: 'list'
    }
  ]

  return (
    <div className='reports'>
      <h1>Raporty/przedmioty</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='courses' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const AkademikiR = () => {
  const c = [
    {
      label: 'Nazwa akademika',
      value: data => data.name,
      type: 'text'
    },
    {
      label: 'Adres',
      value: data => data.address,
      type: 'text'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/akademiki</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='dormitories' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const PokojeR = () => {
  const c = [
    {
      label: 'Numer pokoju',
      value: data => data.number,
      type: 'text'
    },
    {
      label: 'Pojemność pokoju',
      value: data => data.capacity,
      type: 'text'
    },
    {
      label: 'Cena wynajmu',
      value: data => data.cost,
      type: 'text'
    },
    {
      label: 'Numer pokoju',
      value: data => data.number,
      type: 'text'
    },
    {
      label: 'Numer piętra',
      value: data => data.floorId,
      name: data => data.number,
      path: 'floors',
      type: 'list'
    }
  ]

  return (
    <div className='reports'>
      <h1>Raporty/przedmioty</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='courses' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const PietraR = () => {
  const c = [
    {
      label: 'Nazwa akademika',
      value: data => data.dormitoryId,
      name: data => data.name,
      path: 'dormitories',
      type: 'list'
    },
    {
      label: 'Numer piętra',
      value: data => data.number,
      type: 'text'
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/przedmioty</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='courses' columns={c} />
      </PermissionsChecker>
    </div>
  );
};
