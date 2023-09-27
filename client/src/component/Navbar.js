import { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import Wrapper from '../assets/wrappers/Navbar';
const Navbar = () => {
  

  

const [showLogout, setShowLogout] = useState(false)
const { toggleSidebar ,
  // showSidebar,
  user, logoutUser} = useAppContext();

  return (
    <Wrapper>
      <div className='nav-center'>

        <button className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>


        <div>
          <Logo/>
          <h4 className='logo-text'>dashboard</h4>
        </div>

        <div className='btn-container'>
  <button className='btn' onClick={() => setShowLogout(!showLogout)}>
    <FaUserCircle />
      {user.name}
      
    <FaCaretDown />
  </button>
  <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
    <button onClick={() => logoutUser()} className='dropdown-btn'>
      logout
    </button>
  </div>
</div>
      </div>
    </Wrapper>
  );
};

export default Navbar;








