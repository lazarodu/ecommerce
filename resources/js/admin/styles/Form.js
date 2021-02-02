import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    margin: 5px 0;
    label: {
      width: 25%;
    }
    input,
    select {
      width: 75%;
    }
  }
`;

export default Form;
