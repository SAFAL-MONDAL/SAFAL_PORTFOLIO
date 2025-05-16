import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes, Route } from 'react-router-dom';  // <-- notice: no BrowserRouter here
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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

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
              <Contact />
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
