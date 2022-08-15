import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const SignInButton = styled.div`
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

const SignUpButton = styled.div`
  font-size: 12px;
  text-align: right;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
`;

function SignIn({ handleEvent }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [email, password]);

  const _handleSignin = () => {
    axios
      .post(
        API_URL + "/auth/signin",
        {
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("access_token", res.data.access_token);
        navigate("/todo");
      })
      .catch((error) => {
        console.log("로그인 에러 ==> ", error);
      })
      .then(() => {
        console.log("signin api 실행 완료");
      });
  };

  const _handleSignUp = () => {
    handleEvent(true);
  };

  return (
    <Container>
      <Title>로그인</Title>
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
      <SignInButton
        onClick={isValid ? _handleSignin : () => {}}
        style={{
          cursor: isValid ? "pointer" : "auto",
          opacity: isValid ? 1 : 0.2,
        }}
      >
        로그인
      </SignInButton>
      <SignUpButton onClick={_handleSignUp}>회원가입</SignUpButton>
    </Container>
  );
}

export default SignIn;
