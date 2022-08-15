import React, { useState, useEffect } from "react";
import SignIn from "./components/Sign/SignIn";
import SignUp from "./components/Sign/SignUp";
import NotFound from "./components/NotFound/NotFound";
import Todos from "./components/Todos/Todos";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const accessToken = localStorage.getItem("access_token");

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              accessToken === null ? (
                isSignUp ? (
                  <SignUp handleEvent={setIsSignUp} />
                ) : (
                  <SignIn handleEvent={setIsSignUp} />
                )
              ) : (
                <Navigate to="/todo"></Navigate>
              )
            }
          ></Route>
          <Route
            path="/todo"
            element={
              <Todos />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
