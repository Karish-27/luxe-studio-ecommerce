import '@fontsource/cormorant-garamond';
import '@fontsource/inter';

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&family=Inter:wght@300;400;600&display=swap');

html.has-scroll-smooth {
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

*,*::before,*::after{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    overflow-x: hidden;
    background-color: #000000;
    color: #FFFFFF;
}
h1,h2,h3,h4,h5,h6{
    margin: 0;
    padding: 0;
    font-family: 'Cormorant Garamond', serif;
}
a{
    color: inherit;
    text-decoration:none;
}

::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: #111111;
}
::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
    background: #444444;
}
`;

export default GlobalStyles;
