import styled from 'styled-components';
import SocialIcons from './SocialIcons';
import { FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FooterSection>
      <div className="container">
        <FooterContent>
          <MainContent>
            <SocialContainer>
              <SocialTitle>Connect With Me</SocialTitle>
              <SocialIcons />
            </SocialContainer>

         

            <LinksContainer>
              <LinksTitle>About Me</LinksTitle>
              <FooterLinks>
                <FooterLink href="#">Terms</FooterLink>
                <Divider>•</Divider>
                <FooterLink href="#">Privacy</FooterLink>
                <Divider>•</Divider>
                <FooterLink href="#contact">Contact</FooterLink>
                <Divider>•</Divider>
                <FooterLink href="#about">About</FooterLink>
              </FooterLinks>
            </LinksContainer>
          </MainContent>

          <Copyright>
            &copy; {new Date().getFullYear()} <CopyrightLink href="#">SAFAL MONDAL</CopyrightLink>. All Rights Reserved
          </Copyright>

          <ScrollToTop onClick={scrollToTop}>
            <FiArrowUp />
          </ScrollToTop>
        </FooterContent>
      </div>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.cardBg};
  padding: 60px 0 30px;
  position: relative;
  border-top: 1px solid ${({ theme }) => theme.primary + '20'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const SocialContainer = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 0px;
  @media (max-width: 900px) {
    align-items: center;
  }
`;

const SocialTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
`;



const LinksContainer = styled.div`
  flex: 1;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center; /* Changed from flex-end to center */

  @media (max-width: 900px) {
    align-items: center;
  }
`;
const LinksTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-align: center;
  width: 100%;
`;


const FooterLinks = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center; /* Changed from flex-end to center */

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.3px;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    opacity: 1;
    text-decoration: underline;
  }
`;

const Divider = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.5;
  font-weight: 300;
`;

const Copyright = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  text-align: center;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.3px;
`;

const CopyrightLink = styled.a`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  transition: all 0.3s ease;
  letter-spacing: 0.3px;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const ScrollToTop = styled.button`
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    transform: translateX(-50%) translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  svg {
    font-size: 1.5rem;
  }
`;

export default Footer;