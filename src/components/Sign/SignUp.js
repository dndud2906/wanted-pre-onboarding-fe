import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const API_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

const Container = styled.div`
  width: 200px;
  padding: 20px 10px;
  text-align: center;
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  margin-top: 20%;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  margin-bottom: 10px;
`;

const SignUpButton = styled.div`
  width: 100px;
  height: 17px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 0 auto;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const CancelButton = styled.div`
  width: 50px;
  height: 17px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 4px;
  margin: 0 auto;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const ButtonContainer = styled.div`
  display:flex;
`;

function SignUp({ handleEvent }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  const _handleSignup = () => {
    axios
      .post(
        API_URL + "/auth/signup",
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        alert('회원가입이 완료되었습니다.');
        handleEvent(false);
      })
      .catch((error) => {
        console.log("회원가입 에러 ==> ", error);
      })
      .then(() => {
        console.log("signup api 실행 완료");
      });
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <InputContainer>
        <input
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </InputContainer>
      <InputContainer>
        <input
          placeholder="비밀번호를 입력하세요."
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </InputContainer>
      <ButtonContainer>
        <CancelButton onClick={() => handleEvent(false)}>취소</CancelButton>
        <SignUpButton
          onClick={isValid ? _handleSignup : () => {}}
          style={{
            cursor: isValid ? "pointer" : "auto",
            opacity: isValid ? 1 : 0.2,
          }}
        >
          회원가입 완료
        </SignUpButton>
      </ButtonContainer>
    </Container>
  );
}

export default SignUp;
