// frontend/src/components/Blog.tsx
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

type Blog = {
  _id: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  slug: string;
  published: boolean;
  readTime: number;
  createdAt: string;
};

const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl = import.meta.env. || 'https://safal-portfolio-backend.onrender.com';
        const response = await axios.get(`${baseUrl}/api/blogs?published=true`);
        setBlogs(response.data.blogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <BlogSection id="blog">
        <div className="container">
          <LoadingText>Loading blogs...</LoadingText>
        </div>
      </BlogSection>
    );
  }

  if (error) {
    return (
      <BlogSection id="blog">
        <div className="container">
          <ErrorText>{error}</ErrorText>
        </div>
      </BlogSection>
    );
  }

  return (
    <BlogSection id="blog">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionSubtitle>Latest Insights</SectionSubtitle>
          <SectionTitle>Recent <Highlight>Blog Posts</Highlight></SectionTitle>
          <SectionText>
            I write about web development, technology trends, and share my learning experiences.
          </SectionText>
        </motion.div>

        {blogs.length === 0 ? (
          <EmptyState>
            <EmptyStateText>No published blogs yet. Stay tuned for updates!</EmptyStateText>
          </EmptyState>
        ) : (
          <BlogList>
            {blogs.map((blog, index) => (
              <BlogCard
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <BlogImageContainer>
                  <BlogImage src={blog.image} alt={blog.title} />
                  <BlogOverlay>
                    <ReadTime>{blog.readTime} min read</ReadTime>
                  </BlogOverlay>
                </BlogImageContainer>
                
                <BlogContent>
                  <BlogMeta>
                    <BlogCategory>{blog.category}</BlogCategory>
                    <BlogDate>
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </BlogDate>
                  </BlogMeta>
                  
                  <BlogTitle>{blog.title}</BlogTitle>
                  <BlogExcerpt>{blog.excerpt}</BlogExcerpt>
                  
                  <ReadMoreButton
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read More →
                  </ReadMoreButton>
                </BlogContent>
              </BlogCard>
            ))}
          </BlogList>
        )}
      </div>
    </BlogSection>
  );
};

const BlogSection = styled.section`
  padding: 100px 0;
  background: ${({ theme }) => theme.secondary};
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  padding: 60px 0;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #FF3333;
  font-size: 1.2rem;
  padding: 60px 0;
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
  letter-spacing: 2px;
  font-weight: 600;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionText = styled.p`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 0;
`;

const EmptyStateText = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  opacity: 0.7;
`;

const BlogList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 60px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
`;

const BlogImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.1);
  }
`;

const BlogOverlay = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const ReadTime = styled.span`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const BlogContent = styled.div`
  padding: 25px;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
`;

const BlogCategory = styled.span`
  color: ${({ theme }) => theme.primary};
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const BlogDate = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-size: 0.85rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 15px;
  line-height: 1.4;
  font-weight: 600;
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogExcerpt = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 20px;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ReadMoreButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

export default Blog;