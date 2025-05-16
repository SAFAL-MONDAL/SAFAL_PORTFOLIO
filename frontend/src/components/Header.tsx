import { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components
const HeaderWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  padding: 1.25rem 0;
  z-index: 1000;
  background: ${({ theme, $scrolled }) => $scrolled ? theme.navBg : 'transparent'};
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between; /* Change to space-between to place logo on left and nav on right */
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
`;

const NavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1.25rem;
    right: 1.25rem;
    z-index: 1001;
  }
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.navBg};
    display: flex;
    justify-content: center;
    align-items: center;
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease;
    z-index: 1000;
  }
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.875rem;
  margin: 0;
  padding: 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const NavItem = styled.li`
  list-style: none;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  position: relative;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -0.3125rem;
    left: 0;
    width: 0;
    height: 0.125rem;
    background: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3125rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

// New Download CV Button Styled Component
const DownloadButton = styled.a`
  display: inline-block; /* Needed for transform to work correctly */
  background: ${({ theme }) => theme.primary};
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* Zoom in */
  }
`;


interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

const Header = ({ toggleTheme, currentTheme }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['home', 'about', 'projects', 'skills', 'contact'];

  return (
    <HeaderWrapper $scrolled={scrolled}>
      <div className="container" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left side: Logo */}
        <Logo href="/admin">Safal Mondal</Logo>

        {/* Right side: NavToggle + Nav */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavToggle onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </NavToggle>

          <Nav $isOpen={isOpen}>
            <NavList>
              {navItems.map((item) => (
                <NavItem key={item}>
                  <NavLink 
                    href={`#${item}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </NavItem>
              ))}

              {/* New Download CV Button */}
              <NavItem>
                <DownloadButton href="/SAFAL_CV.pdf" download>
                  Download CV
                </DownloadButton>
              </NavItem>

              <ThemeToggle onClick={toggleTheme}>
                {currentTheme === 'light' ? <FaMoon /> : <FaSun />}
              </ThemeToggle>
            </NavList>
          </Nav>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;