// frontend/src/components/AdminDashboard.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const AdminHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${({ theme }) => theme.primary};
`;

const AdminTitle = styled.h1`
  color: ${({ theme }) => theme.primary};
  font-size: 2.5rem;
  margin: 0;
`;

const LogoutButton = styled.button`
  background: #FF3333;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
  
  &:hover {
    background: #cc0000;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.secondary};
`;

const Tab = styled.button<{ $active: boolean }>`
  background: ${({ $active, theme }) => $active ? theme.primary : 'transparent'};
  color: ${({ $active, theme }) => $active ? 'white' : theme.text};
  border: none;
  padding: 12px 24px;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const ContentSection = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ItemCard = styled.div`
  background: ${({ theme }) => theme.secondary};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ItemDescription = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button<{ $variant?: 'edit' | 'delete' | 'view' }>`
  background: ${({ $variant }) => 
    $variant === 'delete' ? '#FF3333' : 
    $variant === 'edit' ? '#FFA500' : '#4CAF50'};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 6px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 6px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 6px;
  background: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
  transform: scale(1.2);
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechItem = styled.span`
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const MessageTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }

  th {
    background: ${({ theme }) => theme.primary};
    color: white;
    font-weight: 600;
  }

  tr:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  padding: 2rem 0;
`;

const ErrorText = styled.p`
  color: #FF3333;
  text-align: center;
  font-size: 1.1rem;
  padding: 1rem;
`;

type Project = {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  image: string;
  featured: boolean;
  order: number;
};

type Blog = {
  _id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  image: string;
  slug: string;
  published: boolean;
  tags: string[];
  readTime: number;
  createdAt: string;
};

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type LoginData = {
  username: string;
  password: string;
};

type TabType = 'projects' | 'blogs' | 'messages';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState<LoginData>({ username: '', password: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'blog' | 'message'>('project');
  const [modalAction, setModalAction] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const baseUrl = import.meta.env.VITE_API_BASE_URL || 'https://safal-portfolio-backend.onrender.com';

  const getAuthHeaders = () => ({
    'x-auth-token': localStorage.getItem('adminToken'),
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      
      if (activeTab === 'projects') {
        const res = await axios.get(`${baseUrl}/api/projects`, { headers });
        setProjects(res.data.projects);
      } else if (activeTab === 'blogs') {
        const res = await axios.get(`${baseUrl}/api/blogs`, { headers });
        setBlogs(res.data.blogs);
      } else if (activeTab === 'messages') {
        const res = await axios.get(`${baseUrl}/api/contact/admin/messages`, { headers });
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        setError('Session expired. Please login again.');
      } else {
        setError('Failed to fetch data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    
    try {
      const res = await axios.post<{ token: string }>(
        `${baseUrl}/api/contact/admin/login`,
        loginData
      );
      localStorage.setItem('adminToken', res.data.token);
      window.location.reload();
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? err.response?.data?.message || 'Invalid credentials'
          : 'Login failed'
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin';
  };

  const openModal = (type: 'project' | 'blog' | 'message', action: 'create' | 'edit' | 'view', item?: any) => {
    setModalType(type);
    setModalAction(action);
    setSelectedItem(item);
    
    if (action === 'create') {
      if (type === 'project') {
        setFormData({
          title: '',
          description: '',
          technologies: '',
          githubLink: '',
          liveLink: '',
          image: '',
          featured: false,
          order: 0
        });
      } else if (type === 'blog') {
        setFormData({
          title: '',
          category: '',
          content: '',
          excerpt: '',
          image: '',
          published: false,
          tags: '',
          readTime: 5
        });
      }
    } else {
      if (type === 'project') {
        setFormData({
          ...item,
          technologies: item.technologies.join(', ')
        });
      } else if (type === 'blog') {
        setFormData({
          ...item,
          tags: item.tags.join(', ')
        });
      }
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const headers = getAuthHeaders();
      let processedData = { ...formData };
      
      if (modalType === 'project') {
        processedData.technologies = formData.technologies.split(',').map((tech: string) => tech.trim());
      } else if (modalType === 'blog') {
        processedData.tags = formData.tags.split(',').map((tag: string) => tag.trim());
      }

      if (modalAction === 'create') {
        if (modalType === 'project') {
          await axios.post(`${baseUrl}/api/projects`, processedData, { headers });
        } else if (modalType === 'blog') {
          await axios.post(`${baseUrl}/api/blogs`, processedData, { headers });
        }
      } else if (modalAction === 'edit') {
        if (modalType === 'project') {
          await axios.put(`${baseUrl}/api/projects/${selectedItem._id}`, processedData, { headers });
        } else if (modalType === 'blog') {
          await axios.put(`${baseUrl}/api/blogs/${selectedItem._id}`, processedData, { headers });
        }
      }

      closeModal();
      fetchData();
    } catch (err) {
      console.error('Error saving:', err);
      setError('Failed to save changes');
    }
  };

  const handleDelete = async (type: 'project' | 'blog', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const headers = getAuthHeaders();
      
      if (type === 'project') {
        await axios.delete(`${baseUrl}/api/projects/${id}`, { headers });
      } else if (type === 'blog') {
        await axios.delete(`${baseUrl}/api/blogs/${id}`, { headers });
      }
      
      fetchData();
    } catch (err) {
      console.error('Error deleting:', err);
      setError('Failed to delete item');
    }
  };

  if (!localStorage.getItem('adminToken')) {
    return (
      <AdminContainer>
        <AdminHeader>
          <AdminTitle>Admin Login</AdminTitle>
        </AdminHeader>
        
        <ContentSection>
          {error && <ErrorText>{error}</ErrorText>}
          
          <Form onSubmit={handleLogin}>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isAuthenticating}>
              {isAuthenticating ? 'Logging in...' : 'Login'}
            </SubmitButton>
          </Form>
        </ContentSection>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Admin Dashboard</AdminTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </AdminHeader>

      <TabsContainer>
        <Tab $active={activeTab === 'projects'} onClick={() => setActiveTab('projects')}>
          Projects
        </Tab>
        <Tab $active={activeTab === 'blogs'} onClick={() => setActiveTab('blogs')}>
          Blogs
        </Tab>
        <Tab $active={activeTab === 'messages'} onClick={() => setActiveTab('messages')}>
          Messages
        </Tab>
      </TabsContainer>

      <ContentSection>
        {error && <ErrorText>{error}</ErrorText>}
        
        {activeTab === 'projects' && (
          <>
            <SectionHeader>
              <SectionTitle>Projects Management</SectionTitle>
              <AddButton onClick={() => openModal('project', 'create')}>
                <FaPlus /> Add Project
              </AddButton>
            </SectionHeader>

            {loading ? (
              <LoadingText>Loading projects...</LoadingText>
            ) : (
              <ItemsGrid>
                {projects.map(project => (
                  <ItemCard key={project._id}>
                    <ItemImage src={project.image} alt={project.title} />
                    <ItemTitle>{project.title}</ItemTitle>
                    <ItemDescription>{project.description}</ItemDescription>
                    <TechList>
                      {project.technologies.map((tech, index) => (
                        <TechItem key={index}>{tech}</TechItem>
                      ))}
                    </TechList>
                    <ItemActions>
                      <ActionButton $variant="view" onClick={() => openModal('project', 'view', project)}>
                        <FaEye /> View
                      </ActionButton>
                      <ActionButton $variant="edit" onClick={() => openModal('project', 'edit', project)}>
                        <FaEdit /> Edit
                      </ActionButton>
                      <ActionButton $variant="delete" onClick={() => handleDelete('project', project._id)}>
                        <FaTrash /> Delete
                      </ActionButton>
                    </ItemActions>
                  </ItemCard>
                ))}
              </ItemsGrid>
            )}
          </>
        )}

        {activeTab === 'blogs' && (
          <>
            <SectionHeader>
              <SectionTitle>Blog Management</SectionTitle>
              <AddButton onClick={() => openModal('blog', 'create')}>
                <FaPlus /> Add Blog
              </AddButton>
            </SectionHeader>

            {loading ? (
              <LoadingText>Loading blogs...</LoadingText>
            ) : (
              <ItemsGrid>
                {blogs.map(blog => (
                  <ItemCard key={blog._id}>
                    <ItemImage src={blog.image} alt={blog.title} />
                    <ItemTitle>{blog.title}</ItemTitle>
                    <ItemDescription>{blog.excerpt}</ItemDescription>
                    <p style={{ color: blog.published ? '#4CAF50' : '#FF9800', fontWeight: '600' }}>
                      Status: {blog.published ? 'Published' : 'Draft'}
                    </p>
                    <TagsContainer>
                      {blog.tags.map((tag, index) => (
                        <Tag key={index}>{tag}</Tag>
                      ))}
                    </TagsContainer>
                    <ItemActions>
                      <ActionButton $variant="view" onClick={() => openModal('blog', 'view', blog)}>
                        <FaEye /> View
                      </ActionButton>
                      <ActionButton $variant="edit" onClick={() => openModal('blog', 'edit', blog)}>
                        <FaEdit /> Edit
                      </ActionButton>
                      <ActionButton $variant="delete" onClick={() => handleDelete('blog', blog._id)}>
                        <FaTrash /> Delete
                      </ActionButton>
                    </ItemActions>
                  </ItemCard>
                ))}
              </ItemsGrid>
            )}
          </>
        )}

        {activeTab === 'messages' && (
          <>
            <SectionHeader>
              <SectionTitle>Contact Messages</SectionTitle>
            </SectionHeader>

            {loading ? (
              <LoadingText>Loading messages...</LoadingText>
            ) : (
              <MessageTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg._id}>
                      <td>{msg.name}</td>
                      <td><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                      <td>{msg.message.substring(0, 50)}...</td>
                      <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td>
                        <ActionButton $variant="view" onClick={() => openModal('message', 'view', msg)}>
                          <FaEye /> View
                        </ActionButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </MessageTable>
            )}
          </>
        )}
      </ContentSection>

      {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {modalAction === 'create' ? 'Create' : modalAction === 'edit' ? 'Edit' : 'View'} {modalType}
              </ModalTitle>
              <CloseButton onClick={closeModal}>
                <FaTimes />
              </CloseButton>
            </ModalHeader>

            {modalType === 'message' ? (
              <div>
                <h3>From: {selectedItem?.name} ({selectedItem?.email})</h3>
                <p><strong>Date:</strong> {new Date(selectedItem?.createdAt).toLocaleString()}</p>
                <div style={{ marginTop: '1rem' }}>
                  <p><strong>Message:</strong></p>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{selectedItem?.message}</p>
                </div>
              </div>
            ) : modalAction === 'view' ? (
              <div>
                {modalType === 'project' ? (
                  <div>
                    <img src={selectedItem?.image} alt={selectedItem?.title} style={{width: '100%', marginBottom: '1rem'}} />
                    <h3>{selectedItem?.title}</h3>
                    <p>{selectedItem?.description}</p>
                    <div>
                      <strong>Technologies:</strong>
                      <TechList>
                        {selectedItem?.technologies.map((tech: string, index: number) => (
                          <TechItem key={index}>{tech}</TechItem>
                        ))}
                      </TechList>
                    </div>
                    {selectedItem?.githubLink && <p><strong>GitHub:</strong> <a href={selectedItem.githubLink} target="_blank">{selectedItem.githubLink}</a></p>}
                    {selectedItem?.liveLink && <p><strong>Live Demo:</strong> <a href={selectedItem.liveLink} target="_blank">{selectedItem.liveLink}</a></p>}
                  </div>
                ) : (
                  <div>
                    <img src={selectedItem?.image} alt={selectedItem?.title} style={{width: '100%', marginBottom: '1rem'}} />
                    <h3>{selectedItem?.title}</h3>
                    <p><strong>Category:</strong> {selectedItem?.category}</p>
                    <p><strong>Excerpt:</strong> {selectedItem?.excerpt}</p>
                    <div style={{ marginTop: '1rem' }}>
                      <p><strong>Content:</strong></p>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{selectedItem?.content}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                {modalType === 'project' ? (
                  <>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Description</Label>
                      <TextArea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Technologies (comma separated)</Label>
                      <Input
                        type="text"
                        value={formData.technologies || ''}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                        placeholder="React, Node.js, MongoDB"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>GitHub Link</Label>
                      <Input
                        type="url"
                        value={formData.githubLink || ''}
                        onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Live Link</Label>
                      <Input
                        type="url"
                        value={formData.liveLink || ''}
                        onChange={(e) => setFormData({...formData, liveLink: e.target.value})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Image URL</Label>
                      <Input
                        type="url"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Order</Label>
                      <Input
                        type="number"
                        value={formData.order || 0}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>
                        <Checkbox
                          checked={formData.featured || false}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                        />
                        Featured Project
                      </Label>
                    </FormGroup>
                  </>
                ) : (
                  <>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Category</Label>
                      <Input
                        type="text"
                        value={formData.category || ''}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Excerpt</Label>
                      <TextArea
                        value={formData.excerpt || ''}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Content</Label>
                      <TextArea
                        value={formData.content || ''}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        style={{ minHeight: '150px' }}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Image URL</Label>
                      <Input
                        type="url"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Tags (comma separated)</Label>
                      <Input
                        type="text"
                        value={formData.tags || ''}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        placeholder="JavaScript, React, Web Development"
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>Read Time (minutes)</Label>
                      <Input
                        type="number"
                        value={formData.readTime || 5}
                        onChange={(e) => setFormData({...formData, readTime: parseInt(e.target.value)})}
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>
                        <Checkbox
                          checked={formData.published || false}
                          onChange={(e) => setFormData({...formData, published: e.target.checked})}
                        />
                        Published
                      </Label>
                    </FormGroup>
                  </>
                )}
                
                <SubmitButton type="submit">
                  {modalAction === 'create' ? 'Create' : 'Update'}
                </SubmitButton>
              </Form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;