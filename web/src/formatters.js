import dateFormat from 'dateformat';

// Original code of this function come from https://stackoverflow.com/a/2901298
export function moneyFormatter(x) {
    const base = Math.floor(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const rest = Math.floor((x % 1) * 100).toString().padStart(2, '0');
    return base + ',' + rest;
}
  
  // It's not perfect but we can assume that capacity of room never exceeds 10
export function capacityFormatter(value) {
    if (value === 1) {
      return `${value} osoba`;
    } else if (value >= 2 && value <= 4) {
      return `${value} osoby`;
    } else {
      return `${value} osób`;
    }
}
  
export function personFormatter(degree, firstName, lastName) {
    return `${degree ? (degree + ' '): ''}${firstName} ${lastName}`
}
  
export function dateFormatter(dateText) {
    return dateFormat(new Date(dateText), 'dd.mm.yyyy') + ' r.'
}
  
export function academicYearFormatter(semesterYear) {
    return `${semesterYear}/${semesterYear + 1}`
}


const letters = 'A-Za-zŻżÓóŁłĆćĘęŚśĄąŹźŃń';
const digits = '0-9';
const special = '.,;:/\\-';
const whitespace = ' ';

export const regexFactory = (allowConf, min, max) => {
  const allowed = [...allowConf]
    .map(e => {
      if (e === 'l') {
        return letters;
      } else if (e === 'd') {
        return digits;
      } else if (e === 's') {
        return special;
      } else if (e === 'w') {
        return whitespace;
      } else {
        return '';
      }
    })
    .join('');

  let length;
  if (max === undefined) {
    length = `${min}`;
  } else {
    length = `${min},${max}`
  }

  return `[${allowed}]{${length}}`
}
