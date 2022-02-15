import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Main from './pages/Main'
import Nawigacja from './pages/Nawigacja'
import { RaportyR, StudenciR, PracownicyR, WydzialyR, UczelniaR, ZakladyR, WynagrodzeniaR, Dane_osoboweR, KierunkiR, OpiekunowieR, PrzedmiotyR, ProwadzacyR, AkademikiR, PokojeR, PietraR, MieszkancyR } from './pages/Raporty';
import { RaportyT, StudenciT, PracownicyT, WydzialyT, UczelniaT, ZakladyT, WynagrodzeniaT, Dane_osoboweT, KierunkiT, OpiekunowieT, PrzedmiotyT, ProwadzacyT, AkademikiT, PokojeT, PietraT, MieszkancyT } from './pages/Tabele';
import { Autorzy } from './pages/Autorzy';
import { Kontakt } from './pages/Kontakt';


const LoggedUserPage = () => {
  return (
    <>
      <Sidebar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/login'exact component={Login} />
        <Route path='/forgot' exact component={Forgot} />
        <Route path='/nawigacja' exact component={Nawigacja} />
        <Route path='/raporty' exact component={RaportyR} />
        <Route path='/raporty/studenci' exact component={StudenciR} />
        <Route path='/raporty/pracownicy' exact component={PracownicyR} />
        <Route path='/raporty/wydzialy' exact component={WydzialyR} />
        <Route path='/raporty/uczelnia' exact component={UczelniaR} />
        <Route path='/raporty/zakłady' exact component={ZakladyR} />
        <Route path='/raporty/wynagrodzenia' exact component={WynagrodzeniaR} />
        <Route path='/raporty/dane_osobowe' exact component={Dane_osoboweR} />
        <Route path='/raporty/kierunki' exact component={KierunkiR} />
        <Route path='/raporty/opiekunowie' exact component={OpiekunowieR} />
        <Route path='/raporty/przedmioty' exact component={PrzedmiotyR} />
        <Route path='/raporty/prowadzacy' exact component={ProwadzacyR} />
        <Route path='/raporty/akademiki' exact component={AkademikiR} />
        <Route path='/raporty/pokoje' exact component={PokojeR} />
        <Route path='/raporty/pietra' exact component={PietraR} />
        <Route path='/raporty/mieszkancy' exact component={MieszkancyR} />

        <Route path='/tabele' exact component={RaportyT} />
        <Route path='/tabele/studenci' exact component={StudenciT} />
        <Route path='/tabele/pracownicy' exact component={PracownicyT} />
        <Route path='/tabele/wydzialy' exact component={WydzialyT} />
        <Route path='/tabele/uczelnia' exact component={UczelniaT} />
        <Route path='/tabele/zakłady' exact component={ZakladyT} />
        <Route path='/tabele/wynagrodzenia' exact component={WynagrodzeniaT} />
        <Route path='/tabele/dane_osobowe' exact component={Dane_osoboweT} />
        <Route path='/tabele/kierunki' exact component={KierunkiT} />
        <Route path='/tabele/opiekunowie' exact component={OpiekunowieT} />
        <Route path='/tabele/przedmioty' exact component={PrzedmiotyT} />
        <Route path='/tabele/prowadzacy' exact component={ProwadzacyT} />
        <Route path='/tabele/akademiki' exact component={AkademikiT} />
        <Route path='/tabele/pokoje' exact component={PokojeT} />
        <Route path='/tabele/pietra' exact component={PietraT} />
        <Route path='/tabele/mieszkancy' exact component={MieszkancyT} />

        <Route path='/authors' exact component={Autorzy} />
        <Route path='/kontakt' exact component={Kontakt} />
      </Switch>
    </>
  );
}


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route path='/' component={LoggedUserPage} />
      </Switch>
    </Router>
  );
}

export default App;
