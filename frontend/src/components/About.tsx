"use client"

import styled from "styled-components"
import { motion } from "framer-motion"

const About = () => {
  return (
    <AboutSection id="about">
      <div className="container">
        <AboutWrapper>
          <AboutContent>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Subtitle>I'm a Developer</Subtitle>
              <Title>I Develop Applications That Help People</Title>
              <AboutText>
  I specialize in building efficient, scalable web applications using modern technologies and clean architecture, ensuring seamless user experiences and robust functionality.
</AboutText>
<AboutText>
  With a strong focus on performance and maintainability, I develop solutions that align with industry standards, optimized for both client-side and server-side operations.
</AboutText>

              <PrimaryButton href="#portfolio">View Projects</PrimaryButton>
            </motion.div>
          </AboutContent>

          <AboutImageContainer>
            {/* JavaScript Icon - Top */}
            <TechIconFloating
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              top="-40px"
              left="20%"
            >
              <TechIcon>
                <img
                  src="/js.webp"
                  alt="JavaScript"
                />
              </TechIcon>
            </TechIconFloating>

            {/* Main Image */}
            <ImageWrapper>
              <motion.img
                src="/My photo 2.png"
                alt="Developer working"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />
            </ImageWrapper>

            {/* CSS Icon - Bottom */}
            <TechIconFloating
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              bottom="-40px"
              left="60%"
            >
              <TechIcon>
                <img
                  src="/css.jpg"
                  alt="CSS"
                />
              </TechIcon>
            </TechIconFloating>

            {/* AWS Icon - Right */}
            <TechIconFloating
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              top="40%"
              right="-25px"
            >
              <TechIcon>
                <img
                  src="/AWS.png"
                  alt="AWS"
                />
              </TechIcon>
            </TechIconFloating>

            {/* Secondary Image */}
            <SecondaryImageWrapper
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <img
                src="/ME.png"
                alt="Developer with headphones"
              />
            </SecondaryImageWrapper>
          </AboutImageContainer>
        </AboutWrapper>
      </div>
    </AboutSection>
  )
}

const AboutSection = styled.section`
  padding: 120px 0;
  background: ${({ theme }) => theme.body || "#1a1a2e"};
  position: relative;
  overflow: hidden;
`

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 80px;
  }
`

const AboutContent = styled.div`
  flex: 1;
  max-width: 550px;
  
  @media (max-width: 992px) {
    max-width: 100%;
    text-align: center;
  }
`

const Subtitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.primary || "#4361ee"};
  margin-bottom: 0.75rem;
  font-weight: 600;
  letter-spacing: 1px;
`

const Title = styled.h2`
  font-size: 2.75rem;
  color: ${({ theme }) => theme.text || "#ffffff"};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`

const AboutText = styled.p`
  color: ${({ theme }) => (theme.text ? `${theme.text}cc` : "#ffffffcc")};
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.05rem;
`

const PrimaryButton = styled.a`
  display: inline-block;
  background: ${({ theme }) => theme.primary || "#4361ee"};
  color: white;
  padding: 16px 36px;
  border-radius: 50px;
  font-weight: 600;
  margin-top: 15px;
  transition: all 0.3s ease;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(67, 97, 238, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(67, 97, 238, 0.4);
  }
`

const AboutImageContainer = styled.div`
  flex: 1;
  position: relative;
  max-width: 500px;
  margin: 40px 0;
  
  @media (max-width: 992px) {
    width: 100%;
    top: 0;

  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 1;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
  }
`

const SecondaryImageWrapper = styled(motion.div)`
  position: absolute;
  bottom: -30px;
  left: -60px;
  width: 40%;
  height: auto;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  border: 5px solid ${({ theme }) => theme.body || "#1a1a2e"};
  z-index: 2;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  @media (max-width: 768px) {
    width: 35%;
    left: -20px;
  }
`

const TechIconFloating = styled(motion.div)`
  position: absolute;
  z-index: 5;
  top: ${(props) => props.top || "auto"};
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  bottom: ${(props) => props.bottom || "auto"};
`

const TechIcon = styled.div`
  width: 85px;
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  padding: 8px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  
  }
`

export default About
