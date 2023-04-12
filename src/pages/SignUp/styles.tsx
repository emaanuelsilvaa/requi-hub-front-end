import styled from "styled-components";


export const Container = styled.div`
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

export const Form = styled.form`
  width: 300px;
  background: #eee;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: right;
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  button {
    color: #fff;
    font-size: 16px;
    fontFamily: 'Poppins';
    background: #7B1026;
    height: 46px;
    margin-top: 25px;
    border: 0;
    border-radius: 3px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
  h1{
    margin: 0px;
    color: #7B1026;
    fontFamily: 'Poppins';
  }
`;