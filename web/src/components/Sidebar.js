import React, { useState } from 'react';
import {Link } from '@material-ui/core'
import styled from 'styled-components';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import '../styles/main.css'
import Cookies from 'universal-cookie'


const SidebarNav = styled.nav`
  overflow-y: scroll;
  background: #581845;
  width: 250px;
  height: 100vh;
  justify-content: center;
  top: 0;
  transition: .3s;
  z-index: 10;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  position: fixed;
  display: flex;
  cursor: pointer;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
    const cookies = new Cookies()
    cookies.remove('loginToken');
    console.log('Usunąłem ciasteczko')
    window.location.reload();
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='gora'>
          <div className="NavIcon" to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </div>
          <div className="tytul"><a href="/" className='t2'>System wspomagania uczelni wyższej 4.0</a></div>
          <Link href='/login'><i className="fas fa-sign-in-alt"></i></Link>
          {/* <Link href='/signin'><i class="fas fa-user-plus"></i></Link> */}
        </div>



        <SidebarNav sidebar={sidebar}>
          <div className="wrap">
            <div className="NavIcon" to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </SidebarNav>
      </IconContext.Provider>
      <script src='../../public/button.js'></script>
    </>
  );
};

export default Sidebar;
