import React from 'react';
import '../styles/MainPage.css';

const Main = () => {
  return (
    <div className='home'>
      <h1 className='header'>Witamy w systemie wspomagającym pracowników w zarządzaniu uczelnią wyższą</h1>

      <section className='text'>
        <p>
          Rzeczywistość funkcjonowania uczelni wyższej w zakresie obsługi studentów jest skomplikowana. W celu
          zwiększenia czytelności aplikacji i łatwiejszej jej obsługi naszą rzeczywistość zostanie poddana pewnym
          uproszczeniom.
        </p>
        <ul className='list'>
          <li>Podstawowym elementem rzeczywistości jest student. Studenta możemy rozróżnić na podstawie unikalnego peselu. Ponadto student posiada unikalny w
              ramach jednej uczelni numer indeksu. Będziemy również
              posiadali takie dane jak imię, nazwisko, kierunek studiów, semestr studiów oraz grupę dziekańską. Ponadto
              każdy student posiada swoją legitymację studencką z datą ważności i datą wydania. Ewentualne posiadanie
              przez studenta stopnia naukowego1
              jest istotne z punktu widzenia naszej rzeczywistości .
          </li>
          <li>
              Każdy pracownik uczelni posiada swój unikalny numer pesel, imię i nazwisko oraz zakład w którym
              pracuje. Z każdym pracownikiem będzie powiązany stopień naukowy 1
              . Z pracownikiem powiązane jest
              również jego wynagrodzenie podstawowe i premia roczna. Pracownik uczelni może prowadzić pewną liczbę
              przedmiotów na dowolnej liczbie kierunków.
          </li>
          <li>
              Przedmiot będzie identyfikowany na podstawie swojej nazwy oraz przypisanego kierunku studiów oraz
              semestru. Przedmioty na różnych kierunkach o tej samej nazwie będą mogły się różnić. Każdy przedmiot
              będzie posiadał prowadzącego oraz przypisaną do niego pewną grupę studentów
          </li>
          <li>
              Uczelnia jest podzielona na wydziały które mają swój adres i unikalną nazwę. Każdy wydział prowadzi
              pewną być może zerową liczbę kierunków studiów na których studiuje pewna liczba studentów.
          </li>
        </ul>
      </section>
      <h2 className='header'>W razie pytań zapraszamy do kontaktu :)</h2>
    </div>
  );
};

export default Main;