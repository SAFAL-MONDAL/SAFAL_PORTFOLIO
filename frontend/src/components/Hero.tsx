import { motion } from 'framer-motion';
import styled from 'styled-components';
import SocialIcons from './SocialIcons';
import img from '/My photo 1.png'; // Replace with your image path
const Hero = () => {
  return (
    <HeroSection id="home">
      <div className="container">
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSubtitle>Hello I'm</HeroSubtitle>
            <HeroTitle>SAFAL MONDAL</HeroTitle>
            <HeroText> Web Developer from <span style={{ fontWeight: 'bold' }}>
    <span style={{ color: '#EA7300' }}>IN</span>
    <span style={{ color: '#FFFFFF' }}>D</span>
    <span style={{ color: '#5CB338' }}>IA</span>
  </span> </HeroText>
            <HeroDescription>
              I create beautiful, functional websites and applications with modern technologies.
            </HeroDescription>
            <ButtonGroup>
              <PrimaryButton href="#contact">Contact Me</PrimaryButton>
              <SecondaryButton href="#about">About Me</SecondaryButton>
            </ButtonGroup>
            <SocialIcons />
          </motion.div>
        </HeroContent>
        <HeroImage>
        <img src={img} alt="Logo" />
          <ExperienceBadge>
            <ExperienceNumber>12+</ExperienceNumber>
            <ExperienceText>Projects</ExperienceText>
          </ExperienceBadge>
        </HeroImage>
      </div>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 100px 0;
  background: ${({ theme }) => theme.gradient};

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    @media (max-width: 768px) {
      flex-direction: column; /* Stack items vertically on mobile */
    }
  }
`;



const HeroContent = styled.div`
  flex: 1;
  padding-right: 30px;

  @media (max-width: 768px) {
    order: 2;
    padding-right: 0;
    text-align: center;
  }
`;


const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 10px;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
  line-height: 1.2;
`;

const HeroText = styled.p`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
  opacity: 0.8;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 30px;
  max-width: 500px;
  opacity: 0.9;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const PrimaryButton = styled.a`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled.a`
  border: 2px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary};
  padding: 10px 28px;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HeroImage = styled.div`
  flex: 1;
  position: relative;

  img {
    width: 70%;
    max-width: 500px;
    border-radius: 500px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
  order: 1;
  width: 150px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

  }

`;
const ExperienceBadge = styled.div`
  position: absolute;
  bottom: 5px;
  right: 150px;
  background: ${({ theme }) => theme.cardBg};
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: none; /* Hide badge on mobile */
  }
`;


const ExperienceNumber = styled.p`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 5px;

`;

const ExperienceText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;


export default Hero;