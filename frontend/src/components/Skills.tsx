import styled from 'styled-components';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', level: 95 },
  { name: 'CSS', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'React', level: 85 },
  { name: 'Node.js', level: 75 },
  { name: 'Express.js,', level: 75 },
  { name: 'MongoDB', level: 85 },
  { name: 'AWS', level: 80 },
  
];

const Skills = () => {
  return (
    <SkillsSection id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionSubtitle>My Skills</SectionSubtitle>
          <SectionTitle>I Develop Skills Regularly</SectionTitle>
          <SectionText>
            I continuously improve my skills to stay current with the latest technologies and best practices.
          </SectionText>
        </motion.div>

        <SkillsList>
          {skills.map((skill, index) => (
            <SkillItem 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillPercent>{skill.level}%</SkillPercent>
              </SkillHeader>
              <SkillBar>
                <SkillProgress $level={skill.level} />
              </SkillBar>
            </SkillItem>
          ))}
        </SkillsList>
      </div>
    </SkillsSection>
  );
};

const SkillsSection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.secondary};
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const SkillsList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const SkillItem = styled(motion.div)`
  margin-bottom: 20px;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const SkillName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const SkillPercent = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const SkillBar = styled.div`
  height: 10px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 5px;
  overflow: hidden;
`;

const SkillProgress = styled.div<{ $level: number }>`
  height: 100%;
  width: ${({ $level }) => $level}%;
  background: ${({ theme }) => theme.primary};
  border-radius: 5px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  }
`;

export default Skills;