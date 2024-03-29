import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

export const Form = styled.form`
  width: 300px;
  background: #eee;
  margin: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: right;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
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
    cursor: pointer;
  }
  hr {
    margin-bottom: 10px;
    margin-top: 25px;
    border: none;
    border-bottom: 1px solid #818E9B;
    width: 100%;
  }
  a {
    margin-bottom: 5px;
    font-size: 5;
    color: #999;
  }
  h1{
    margin: 0px;
    color: #7B1026;
    fontFamily: 'Poppins';
  }
`;