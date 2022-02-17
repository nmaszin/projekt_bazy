import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Main from './pages/Main'
import Nawigacja from './pages/Nawigacja'
import { RaportyR, OsobyR, StudenciR, PracownicyR, WydzialyR, ZakladyR, WynagrodzeniaR, KierunkiR, PrzedmiotyR, AkademikiR, PokojeR, PietraR, GrupyR, LegitymacjeR, KolaR } from './pages/Raporty';
import { RaportyT, OsobyT, StudenciT, PracownicyT, WydzialyT, ZakladyT, WynagrodzeniaT, KierunkiT, PrzedmiotyT, AkademikiT, PokojeT, PietraT, GrupyT, LegitymacjeT, KolaT, UzytkownicyT } from './pages/Tabele';
import { Autorzy } from './pages/Autorzy';
import { Kontakt } from './pages/Kontakt';
import Cookies from 'universal-cookie'

const LoggedUserPage = () => {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path='/' exact component={Main} />
        <Route path='/forgot' exact component={Forgot} />
        <Route path='/nawigacja' exact component={Nawigacja} />
        <Route path='/raporty' exact component={RaportyR} />
        <Route path='/raporty/osoby' exact component={OsobyR} />
        <Route path='/raporty/studenci' exact component={StudenciR} />
        <Route path='/raporty/pracownicy' exact component={PracownicyR} />
        <Route path='/raporty/wydzialy' exact component={WydzialyR} />
        <Route path='/raporty/zaklady' exact component={ZakladyR} />
        <Route path='/raporty/wynagrodzenia' exact component={WynagrodzeniaR} />
        <Route path='/raporty/kierunki' exact component={KierunkiR} />
        <Route path='/raporty/przedmioty' exact component={PrzedmiotyR} />
        <Route path='/raporty/akademiki' exact component={AkademikiR} />        
        <Route path='/raporty/pietra' exact component={PietraR} />
        <Route path='/raporty/pokoje' exact component={PokojeR} />
        <Route path='/raporty/grupy' exact component={GrupyR} />
        <Route path='/raporty/legitymacje' exact component={LegitymacjeR} />
        <Route path='/raporty/kola' exact component={KolaR} />

        <Route path='/tabele' exact component={RaportyT} />
        <Route path='/tabele/osoby' exact component={OsobyT} />
        <Route path='/tabele/studenci' exact component={StudenciT} />
        <Route path='/tabele/pracownicy' exact component={PracownicyT} />
        <Route path='/tabele/wydzialy' exact component={WydzialyT} />
        <Route path='/tabele/zaklady' exact component={ZakladyT} />
        <Route path='/tabele/wynagrodzenia' exact component={WynagrodzeniaT} />
        <Route path='/tabele/kierunki' exact component={KierunkiT} />
        <Route path='/tabele/przedmioty' exact component={PrzedmiotyT} />
        <Route path='/tabele/akademiki' exact component={AkademikiT} />
        <Route path='/tabele/pietra' exact component={PietraT} />
        <Route path='/tabele/pokoje' exact component={PokojeT} />
        <Route path='/tabele/grupy' exact component={GrupyT} />
        <Route path='/tabele/legitymacje' exact component={LegitymacjeT} />
        <Route path='/tabele/kola' exact component={KolaT} />
        <Route path='/tabele/uzytkownicy' exact component={UzytkownicyT} />

        <Route path='/autorzy' exact component={Autorzy} />
        <Route path='/kontakt' exact component={Kontakt} />
      </Switch>
    </Router>
  );
}


function App() {
  const cookies = new Cookies();
  const token = cookies.get('loginToken');
  return token === undefined ? Login() : LoggedUserPage();
}

export default App;

