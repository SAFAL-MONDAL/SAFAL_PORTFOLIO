import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: 'Open Sans', sans-serif;
    transition: all 0.25s linear;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px; /* Consider using a variable for padding */
  }

  .section {
    padding: 80px 0;
  }

  .section-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }

  .section-subtitle {
    color: ${({ theme }) => theme.primary};
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .btn {
    display: inline-block;
    padding: 10px 30px;
    border-radius: 50px;
    background: ${({ theme }) => theme.primary};
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
`;