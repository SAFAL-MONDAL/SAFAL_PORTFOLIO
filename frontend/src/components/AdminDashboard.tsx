import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoginForm = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MessageTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.secondary};
  }

  th {
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  tr:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;


type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const AdminDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL || ''}/api/contact/admin/messages`,
          {
            headers: { 
              'x-auth-token': token,
              'Content-Type': 'application/json'
            }
          }
        );
        setMessages(res.data.messages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch messages. Please login again.');
        setLoading(false);
        localStorage.removeItem('adminToken');
      }
    };

    fetchMessages();
  }, []);

  interface LoginData {
    username: string;
    password: string;
  }

  interface LoginResponse {
    token: string;
  }

  interface ErrorResponse {
    message?: string;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setError('');
    
    try {
      const res = await axios.post<LoginResponse>(
        `${import.meta.env.VITE_API_BASE_URL || ''}/api/contact/admin/login`,
        loginData
      );
      localStorage.setItem('adminToken', res.data.token);
      window.location.reload();
    } catch (err: unknown) {
      setError(
        axios.isAxiosError(err)
          ? (err.response?.data as ErrorResponse)?.message || 'Invalid credentials'
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

  if (!localStorage.getItem('adminToken')) {
    return (
      <LoginForm>
        <h2>Admin Login</h2>
        {error && <p style={{ color: '#FF3333' }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            required
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
          <button 
            type="submit"
            disabled={isAuthenticating}
            style={{
              background: '#3a7bd5',
              color: 'white',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {isAuthenticating ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </LoginForm>
    );
  }

  return (
    <AdminContainer>
      
      
      {loading ? (
        <p>Loading messages...</p>
      ) : error ? (
        <p style={{ color: '#FF3333' }}>{error}</p>
      ) : (
        <>
          <MessageTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(msg => (
                <tr 
                  key={msg._id}
                  onClick={() => setSelectedMessage(msg)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{msg.name}</td>
                  <td><a href={`mailto:${msg.email}`}>{msg.email}</a></td>
                  <td>{msg.message.substring(0, 50)}...</td>
                  <td>{new Date(msg.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </MessageTable>

         {selectedMessage && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      background: '#fff', // Replace with your desired static color or use a variable if available
      color: '#222', // Replace with your desired static color or use a variable if available
      padding: '2rem',
      borderRadius: '8px',
      maxWidth: '600px',
      width: '90%'
    }}>
      <h3>Message Details</h3>
      <p><strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})</p>
      <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Message:</strong></p>
        <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.message}</p>
      </div>
      <button 
        onClick={() => setSelectedMessage(null)}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: '#3a7bd5', // You can also use theme.primary here
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

        </>
      )}
    </AdminContainer>
  );
};

export default AdminDashboard;