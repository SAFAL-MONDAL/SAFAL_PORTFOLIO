import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const SocialIcons = () => {
  return (
    <SocialIconsContainer>
      <SocialLink href="https://github.com/SAFAL-MONDAL" target="_blank" rel="noopener noreferrer">
        <FaGithub />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/in/safal-mondal-7b1299258" target="_blank" rel="noopener noreferrer">
        <FaLinkedin />
      </SocialLink>
      <SocialLink href="https://www.facebook.com/safal.mondal.92" target="_blank" rel="noopener noreferrer">
        <FaFacebook />
      </SocialLink>
      <SocialLink href="https://www.instagram.com/safal_mondal" target="_blank" rel="noopener noreferrer">
        <FaInstagram />
      </SocialLink>
    </SocialIconsContainer>
  );
};


const SocialIconsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;

  /* Default to center for smaller screens */
  justify-content: center;

  @media (min-width: 1024px) {
    /* Align left to match the PrimaryButton on larger screens */
    justify-content: flex-start;
  }
`;


const SocialLink = styled.a`
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-3px);
  }
`;

export default SocialIcons;