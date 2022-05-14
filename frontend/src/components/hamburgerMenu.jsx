import { useEffect, useState } from 'react';

import IconHamburger from '../assets/shared/mobile/icon-hamburger.svg';
import IconClose from '../assets/shared/mobile/icon-close.svg';

import '../styles/components/hamburgerMenu.css';

const HamburgerMenu = ({ passIsMenuOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    passIsMenuOpen(isMenuOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  return (
    <div className='HamburgerMenu'>
      {isMenuOpen ? (
        <img
          src={IconClose}
          alt='Menu'
          className='HamburgerMenu-icon'
          onClick={handleClick}
        />
      ) : (
        <img
          src={IconHamburger}
          alt='Menu'
          className='HamburgerMenu-icon'
          onClick={handleClick}
        />
      )}
    </div>
  );
};
export default HamburgerMenu;
