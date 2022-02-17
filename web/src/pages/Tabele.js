import React from 'react';
import '../styles/Tabele.css'
import TabelaWrapper from '../components/TabelaWrapper';
import PermissionsChecker from '../components/PermissionsChecker';
import { moneyFormatter, capacityFormatter, personFormatter, dateFormatter, academicYearFormatter, regexFactory } from '../formatters';
import '../styles/Raporty.css';

export const RaportyT = () => {
  return (
    <div className='reports'>
      <h1>Tabele</h1>
    </div>
  );
};

export const OsobyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Imię',
      value: 'firstName',
      type: 'text',
      pattern: regexFactory('l', 1, 30)
    },
    {
      label: 'Nazwisko',
      value: 'lastName',
      type: 'text',
      pattern: regexFactory('l', 1, 30)
    },
    {
      label: 'PESEL',
      value: 'pesel',
      type: 'text',
      pattern: regexFactory('d', 11)
    },
    {
      label: 'Adres',
      value: 'address',
      type: 'text',
      pattern: regexFactory('ldsw', 1, 100)
    }
  ]

  return (
    <div className='reports'>
      <h1>Tabele/osoby</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='people' columns={c} />
      </PermissionsChecker>
    </div>
  )
};


export const StudenciT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Stopień naukowy',
      value: 'degree',
      type: 'text',
      pattern: regexFactory('lsw', 1, 30),
      optional: true
    },
    {
      label: 'Nr albumu',
      value: 'identifier',
      type: 'text',
      pattern: regexFactory('d', 5, 10)
    },
    {
      label: 'Osoba',
      value: 'personId',
      path: 'people',
      name: data => personFormatter(undefined, data.firstName, data.lastName),
      type: 'list'
    },
    {
      label: 'Grupa',
      value: 'groupId',
      path: 'views/groups',
      name: data => `${data.groupName}(${data.subjectName} sem. ${data.semesterNumber}/${data.semesterYear})`,
      type: 'list'
    },
  ]

  return (
    <div className='reports'>
      <h1>Tabele/studenci</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='students' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const PracownicyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Stopień naukowy',
      value: 'degree',
      type: 'text',
      pattern: regexFactory('ldsw', 1, 30)
    },
    {
      label: 'Osoba',
      value: 'personId',
      path: 'people',
      name: data => personFormatter(undefined, data.firstName, data.lastName),
      type: 'list'
    }
  ]

  return (
    <div className='reports'>
      <h1>Tabele/pracownicy</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='employees' columns={c} />
      </PermissionsChecker>
    </div>
  )
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
      type: 'text',
      pattern: regexFactory('lw', 1, 100)
    },
    {
      label: 'Adres',
      value: 'address',
      type: 'text',
      pattern: regexFactory('ldsw', 1, 100)
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/pracownicy</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='faculties' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const ZakladyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa zakładu',
      value: 'name',
      type: 'text',
      pattern: regexFactory('lw', 1, 100)
    },
    {
      label: 'Wydział',
      value: 'facultyId',
      type: 'list',
      path: 'views/faculties',
      name: data => data.name
    },
    {
      label: 'Kierownik',
      value: 'managerId',
      type: 'list',
      path: 'views/employees',
      name: data => personFormatter(data.degree, data.firstName, data.lastName)
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/zakłady</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='laboratories' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const WynagrodzeniaT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Pracownik',
      value: 'employeeId',
      type: 'list',
      path: 'views/employees',
      name: data => personFormatter(data.degree, data.firstName, data.lastName)
    },
    {
      label: 'Płaca podstawowa',
      value: 'baseSalary',
      type: 'number'
    },
    {
      label: 'Premia roczna',
      value: 'yearBonus',
      type: 'number'
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/wynagrodzenia</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='salaries' columns={c} />
      </PermissionsChecker>
    </div>
  )
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


export const PrzedmiotyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa',
      value: 'name',
      type: 'text',
      pattern: regexFactory('lw', 1, 100)
    },
    {
      label: 'Semester',
      path: 'views/semesters',
      name: data => `Semestr ${data.semesterNumber} (${data.subjectName} rok ${data.semesterYear})`,
      value: 'semesterId',
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/przedmioty</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='courses' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const AkademikiT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa',
      value: 'name',
      type: 'text',
      pattern: regexFactory('ldsw', 1, 100)
    },
    {
      label: 'Adres',
      value: 'address',
      type: 'text',
      pattern: regexFactory('ldsw', 1, 100)
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/akademiki</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='dormitories' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const PietraT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Numer',
      value: 'number',
      type: 'number'
    },
    {
      label: 'Akademik',
      path: 'views/dormitories',
      name: data => `${data.name}, ${data.address}`,
      value: 'dormitoryId',
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/piętra</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='floors' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const PokojeT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Numer pokoju',
      value: 'number',
      type: 'number'
    },
    {
      label: 'Pojemność',
      value: 'capacity',
      type: 'number'
    },
    {
      label: 'Koszt',
      value: 'cost',
      type: 'number'
    },
    {
      label: 'Piętro',
      path: 'views/floors',
      name: data => `Piętro nr ${data.floorNumber} - ${data.dormitoryName}, ${data.dormitoryAddress}`,
      value: 'floorId',
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/pokoje</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='rooms' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const GrupyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa grupy',
      value: 'name',
      type: 'text'
    },
    {
      label: 'Semester',
      path: 'views/semesters',
      name: data => `Semestr ${data.semesterNumber} (${data.subjectName} rok ${data.semesterYear})`,
      value: 'semesterId',
      type: 'list'
    }
  ]

  return(
    <div className='reports'>
      <h1>Tabele/grupy</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='groups' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const LegitymacjeT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Student',
      path: 'views/semesters',
      name: data => `Semestr ${data.semesterNumber} (${data.subjectName} rok ${data.semesterYear})`,
      value: 'studentId',
      type: 'list'
    },
    {
      label: 'Data wydania',
      value: 'dateOfIssue',
      type: 'text'
    },
    {
      label: 'Data wygaśnięcia',
      value: 'expiryDate',
      type: 'text'
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/legitymacje</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='cards' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const KolaT = () => {
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
      label: 'Adres',
      value: 'address',
      type: 'text'
    },
    {
      label: 'Opiekun',
      path: 'views/employees',
      name: data => personFormatter(data.degree, data.firstName, data.lastName),
      value: 'leaderId',
      type: 'list'
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/koła</h1>
      <PermissionsChecker minRole={1}>
        <TabelaWrapper path='clubs' columns={c} />
      </PermissionsChecker>
    </div>
  )
};

export const UzytkownicyT = () => {
  const c = [
    {
      label: 'Identyfikator',
      value: 'id',
      type: 'immutable'
    },
    {
      label: 'Nazwa użytkownika',
      value: 'username',
      type: 'text'
    },
    {
      label: 'Hasło',
      value: 'password',
      type: 'password',
      default: 'Nie podglądaj!'
    },
    {
      label: 'Rola',
      value: 'role',
      type: 'number'
    },
  ]

  return(
    <div className='reports'>
      <h1>Tabele/użytkownicy</h1>
      <PermissionsChecker minRole={2}>
        <TabelaWrapper path='users' columns={c} />
      </PermissionsChecker>
    </div>
  )
};
