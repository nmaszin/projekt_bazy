import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/Navigation.css';



class Navigation extends React.Component {

    state = {
        subsite: ''
    }

    render() {

        const list = [
            { id: "fas fa-user-graduate", name: "Studenci", path: "/students" },
            { id: "fas fa-user-check", name: "Pracownicy", path: "/pracownicy" },
            { id: "fas fa-school", name: "Wydziały", path: "/wydzialy" },
            { id: "fas fa-university", name: "Uczelnia", path: "/uczelnia" },
            { id: "far fa-building", name: "Zaklady", path: "/zaklady" },
            { id: "fas fa-money-bill-wave-alt", name: "Wynagrodzenia", path: "/wynagrodzenia" },
            { id: "fas fa-database", name: "Dane Osobowe", path: "/daneosobowe" },
            { id: "fas fa-arrows-alt", name: "Kierunki", path: "/kierunki" },
            { id: "fas fa-user-shield", name: "Opiekunowie", path: "/opiekunowie" },
            { id: "fas fa-sitemap", name: "Przedmioty", path: "/przedmioty" },
            { id: "fas fa-users", name: "Prowadzący", path: "/prowadzacy" },
            { id: "fas fa-building", name: "Akademiki", path: "/akademiki" },
            { id: "fas fa-person-booth", name: "Pokoje", path: "/pokoje" },
            { id: "fas fa-swimming-pool", name: "Piętra", path: "/pietra" },
            { id: "fas fa-restroom", name: "Mieszkańcy", path: "/mieszkancy" },
        ]

        
        return (
            <nav class="main scroll">
            <h1>Raporty</h1>
                <ul>
                {list.map(item => (
                <li key={item.name}>
                <NavLink to={item.path + 'Rap'}><i class={item.id}></i> {item.name}</NavLink>
                </li>
                ))}
                </ul>

            <h1>Tabele</h1>
                <ul>
                {list.map(item => (
                <li key={item.name}>
                <NavLink to={item.path + 'Tab'}><i class={item.id}></i> {item.name}</NavLink>
                </li>
                ))}
                </ul>                 
        </nav>
        )
    }
}

export default Navigation;