import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'; // Added axios import
// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Skills from './components/Skills';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

interface ThemeType {
  light: 'light';
  dark: 'dark';
}

function App() {
  const [theme, setTheme] = useState<ThemeType['light'] | ThemeType['dark']>('dark');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  // Contact form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('', { name, email, password })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      <Header 
        toggleTheme={toggleTheme} 
        currentTheme={theme} 
      />
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Project />
              <Skills />
              <Contact 
                name={name}
                email={email}
                password={password}
                setName={setName}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
              />
            </>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      
      <Footer />
    </ThemeProvider>
  );
}

export default App;