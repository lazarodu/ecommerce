import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Nunito",Arial, Helvetica, sans-serif;
  }

  :root {
    --main: #008800;
    --main-hover: #005500;
    --white: #ffff;
    --black: #000000;
    --grey: #f0f0f0;

    --primary: #007bff;
    --primary-hover: #0069d9;

    --warning: #f6e987;
    --warning-hover: #f4d83c;

    --danger: #dc3545;
    --danger-hover: #c82333;

    --success: #28a745;
    --success-hover: #218838;

    --secondary: #6c757d;
    --secondary-hover: #5a6268;

    --background-input: #f5c6cb;
  }

  .Toastify__toast-body {
    white-space: pre-line;
  }

  .container {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1350px;
    margin: 0 auto;

    @media (max-width: 992px) {
      max-width: 960px;
    }

    @media (max-width: 768px) {
      max-width: 720px;
    }

    @media (max-width: 576px) {
      width: 100%;
    }
  }
`;
