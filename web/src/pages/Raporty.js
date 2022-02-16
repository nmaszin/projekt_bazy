import React from 'react';
import RaportWrapper from '../components/RaportWrapper';
import PermissionsChecker from '../components/PermissionsChecker';
import '../styles/Raporty.css'

// Original code of this function come from https://stackoverflow.com/a/2901298
function moneyFormatter(x) {
  const base = Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const rest = Math.floor((x % 1) * 100).toString().padStart(2, '0');
  return base + ',' + rest;
}


// It's not perfect but we can assume that capacity of room never exceeds 10
function capacityFormatter(value) {
  if (value === 1) {
    return `${value} osoba`;
  } else if (value >= 2 && value <= 4) {
    return `${value} osoby`;
  } else {
    return `${value} osób`;
  }
}


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
    },
    {
      label: 'Imię',
      value: data => data.firstName,
    },
    {
      label: 'Nazwisko',
      value: data => data.lastName,
    },
    {
      label: 'Adres',
      value: data => data.address,
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
      label: 'Stopień naukowy',
      value: data => data.degree,
    },
    {
      label: 'Imię',
      value: data => data.firstName,
    },
    {
      label: 'Nazwisko',
      value: data => data.lastName,
    },
    {
      label: 'PESEL',
      value: data => data.pesel,
    },
    {
      label: 'Adres',
      value: data => data.address,
    },
    {
      label: 'Numer albumu',
      value: data => data.identifier,
    },
    {
      label: 'Grupa dziekańska',
      value: data => data.groupName,
    },
    {
      label: 'Rok rozpoczęcia studiów',
      value: data => data.semesterYear,
    },
    {
      label: 'Numer semestru',
      value: data => data.semesterNumber,
    },
    {
      label: 'Kierunek',
      value: data => data.subjectName,
    },
    {
      label: 'Wydział',
      value: data => data.facultyName,
    },
  ];

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
      label: 'Stopień naukowy',
      value: data => data.degree,
    },
    {
      label: 'Imię',
      value: data => data.firstName,
    },
    {
      label: 'Nazwisko',
      value: data => data.lastName,
    },
    {
      label: 'PESEL',
      value: data => data.pesel,
    },
    {
      label: 'Adres',
      value: data => data.address,
    }
  ];

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
      value: data => data.name
    },
    {
      label: 'Adres',
      value: data => data.address
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
      value: data => data.laboratoryName,
    },
    {
      label: 'Kierownik',
      value: data => `${data.managerDegree} ${data.managerFirstName} ${data.managerLastName}`,
    },
    {
      label: 'Nazwa wydziału',
      value: data => data.facultyName
    },
    {
      label: 'Adres',
      value: data => data.facultyAddress
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
      label: 'PESEL',
      value: data => data.pesel,
    },
    {
      label: 'Pracownik',
      value: data => `${data.degree} ${data.firstName} ${data.lastName}`,
    },
    {
      label: 'Płaca podstawowa',
      value: data => moneyFormatter(data.baseSalary) + ' zł',
    },
    {
      label: 'Premia roczna',
      value: data => moneyFormatter(data.yearBonus) + ' zł',
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
      label: 'Nazwa kierunku',
      value: data => data.subjectName,
    },
    {
      label: 'Nazwa wydziału',
      value: data => data.facultyName,
    },
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
      value: data => data.courseName
    },
    {
      label: 'Kierunek',
      value: data => data.subjectName,
    },
    {
      label: 'Semestr',
      value: data => data.semesterNumber
    },
    {
      label: 'Rok akademicki',
      value: data => `${data.semesterYear}/${data.semesterYear + 1}`
    },
    {
      label: 'Wydział',
      value: data => data.facultyName
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
    },
    {
      label: 'Adres',
      value: data => data.address,
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

export const PietraR = () => {
  const c = [
    {
      label: 'Nazwa akademika',
      value: data => data.dormitoryName,
    },
    {
      label: 'Adres',
      value: data => data.dormitoryAddress,
    },
    {
      label: 'Piętro',
      value: data => data.floorNumber,
    }
  ]

  return (
    <div className='reports'>
      <h1>Raporty/piętra</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='floors' columns={c} />
      </PermissionsChecker>
    </div>
  );
};

export const PokojeR = () => {
  const c = [
    {
      label: 'Nazwa akademika',
      value: data => data.dormitoryName,
    },
    {
      label: 'Adres',
      value: data => data.dormitoryAddress,
    },
    {
      label: 'Piętro',
      value: data => data.floorNumber,
    },
    {
      label: 'Numer pokoju',
      value: data => data.roomNumber,
    },
    {
      label: 'Pojemność pokoju',
      value: data => capacityFormatter(data.roomCapacity),
    },
    {
      label: 'Cena wynajmu',
      value: data => moneyFormatter(data.roomCost) + ' zł',
    },
  ]

  return (
    <div className='reports'>
      <h1>Raporty/pokoje</h1>
      <PermissionsChecker minRole={0}>
        <RaportWrapper path='rooms' columns={c} />
      </PermissionsChecker>
    </div>
  );
};
