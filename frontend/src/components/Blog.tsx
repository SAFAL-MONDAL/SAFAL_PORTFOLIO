import styled from 'styled-components';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    title: "Jim Morisson Says when the musics over turn off the light",
    category: "Web Development",
    image: "./src/assets/avax.jpg"
  },
  {
    title: "The Future of React and Server Components",
    category: "Web Development",
    image: "./src/assets/kavach.jpg"
  },
  {
    title: "Building Scalable Applications with Microservices",
    category: "Backend Development",
    image: "./src/assets/freshers.jpg"
  }
];

const Blog = () => {
  return (
    <BlogSection id="blog">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionSubtitle>Latest News</SectionSubtitle>
          <SectionTitle>Checkout My Recent Blogs</SectionTitle>
          <SectionText>
            I write about web development, design, and other tech-related topics.
          </SectionText>
        </motion.div>

        <BlogList>
          {blogPosts.map((post, index) => (
            <BlogCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <BlogImage>
                <img src={post.image} alt={post.title} />
              </BlogImage>
              <BlogCategory>{post.category}</BlogCategory>
              <BlogTitle>{post.title}</BlogTitle>
            </BlogCard>
          ))}
        </BlogList>
      </div>
    </BlogSection>
  );
};

const BlogSection = styled.section`
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

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const BlogCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImage = styled.div`
  height: 300px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    ${BlogCard}:hover & {
      transform: scale(1.1);
    }
  }
`;

const BlogCategory = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  font-weight: 600;
  margin: 20px 20px 10px;
`;

const BlogTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin: 0 20px 20px;
  line-height: 1.4;
`;

export default Blog;