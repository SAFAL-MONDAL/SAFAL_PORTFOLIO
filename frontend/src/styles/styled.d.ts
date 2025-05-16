// styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    body: string;
    text: string;
    primary: string;
    secondary: string;
    cardBg: string;
    navBg: string;
    gradient: string;
    top: string;
    bottom: string;
    left: string;
    right: string;
  }
}