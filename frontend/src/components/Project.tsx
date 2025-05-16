import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';

const projects = [
  {
    title: "Student Mentoring System",
    description: "A university-based mentoring system developed using HTML, CSS, MongoDB, Node.js, Docker, and AWS ECS.",
    technologies: ["HTML", "CSS", "MongoDB", "Node.js", "Docker", "AWS EC2"],
    githubLink: "https://github.com/SAFAL-MONDAL/Mentoring_Website",
    liveLink: "https://std-mentoring-edu.netlify.app/",
    image: "/mentoring.webp"
  },
  {
    title: "Chatbot (Bongo ai)",
    description: "Developed a responsive AI chatbot leveraging HTML, CSS, JavaScript, and integrated with the Gemini API.",
    technologies: ["HTML", "CSS", "JavaScipt","Gemini API key"],
    githubLink: "https://github.com/SAFAL-MONDAL/SAFAL-AI",
    liveLink: "https://safal-ai.vercel.app/",
    image: "/chatbot.avif"
  },
  {
    title: "University-Based Intern Portal",
    description: "An intern portal for universities developed using MongoDB, Express.js, Node.js, and React.js.",
    technologies: ["MongoDB", "Express.js", "Node.js", "React.js","Rest API"],
    githubLink: "https://github.com/SAFAL-MONDAL/Internship_Portal",
    liveLink: "https://yourwebsite.com/university-intern-portal",
    image: "/internship.webp"
  }
  
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Project = () => {
  return (
    <PortfolioSection id="projects">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionSubtitle>My Works</SectionSubtitle>
          <SectionTitle>Creative <Highlight>Projects</Highlight></SectionTitle>
          <SectionText>
            Each project represents unique challenges and innovative solutions
          </SectionText>
        </motion.div>

        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard 
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ProjectImageContainer>
                <ProjectImage 
                  src={project.image} 
                  alt={project.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <ProjectOverlay
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ViewProjectButton as="a" href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    View Project <FaArrowRight />
                  </ViewProjectButton>
                </ProjectOverlay>
              </ProjectImageContainer>
              
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechList>
                  {project.technologies.map((tech, techIndex) => (
                    <TechItem 
                      key={techIndex}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </TechItem>
                  ))}
                </TechList>
                <ProjectLinks>
                  {project.githubLink && (
                    <ProjectLink 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                    >
                      <FaGithub /> Code
                    </ProjectLink>
                  )}
                  {project.liveLink && (
                    <ProjectLink 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ y: -5 }}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </div>
    </PortfolioSection>
  );
};

const PortfolioSection = styled.section`
  padding: 120px 0;
  background: ${({ theme }) => theme.body};
  position: relative;
  overflow: hidden;
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.primary};
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 60px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.03) 100%);
    z-index: -1;
    border-radius: 16px;
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  overflow: hidden;
   height: 40%;
  widith: 100%;
`;

const ProjectImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const ProjectOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewProjectButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

const ProjectContent = styled.div`
  padding: 25px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 20px;
  font-size: 1rem;
  line-height: 1.6;
`;

const TechList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 25px;
  list-style: none;
  padding: 0;
`;

const TechItem = styled(motion.li)`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
`;

const ProjectLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
  }
  
  svg {
    font-size: 1rem;
  }
`;

export default Project;