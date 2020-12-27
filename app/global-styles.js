import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  .modal .modal-header .close {
    color: #1d8cf8 !important;
  }

  .modal-content {
    background: #27293d !important;
    .modal-title {
      color: #fff !important;
    }

    .form-group label {
      color: rgba(255,255,255,0.6) !important;
    }
  }

  .form-control:focus {
    border-color: #1d8cf8 !important;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(.8);
    outline: none;
  }

  .outline-none {
    outline: none !important;
  }

  .cursor-pointer{
    cursor: pointer !important;
  }

  button {
    cursor: pointer !important;
  }
`;

export default GlobalStyle;
