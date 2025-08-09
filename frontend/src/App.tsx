// frontend/src/App.tsx
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Styles
import { GlobalStyles } from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './styles/theme';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Skills from './components/Skills';
import Blog from './components/Blog';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

interface ThemeType {
  light: 'light';
  dark: 'dark';
}

function App() {
  const [theme, setTheme] = useState<ThemeType['light'] | ThemeType['dark']>('dark');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyles />
      
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={
          <>
            <Header 
              toggleTheme={toggleTheme} 
              currentTheme={theme} 
            />
            
            <main>
              <Hero />
              <About />
              <Project />
              <Skills />
              <Blog />
              <Contact />
            </main>
            
            <Footer />
          </>
        } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;