import styled from "styled-components";

export const Container = styled.div`
  background: #FFF;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const DragDropContainer = styled.div`
    text-align: center;
    padding: 10px;
    border: 3px #7B1026 dashed;
    border-radius: 10px;
    width: 400px;
    margin-top: 70px;
    margin-right: 80px;
    height: 65%;
`;

export const Form = styled.form`
  width: 300px;
  background: #fff;
  margin: 30px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: right;
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
`;