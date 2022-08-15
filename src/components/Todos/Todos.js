import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TodoItem from "./TodoItem";

const API_URL =
  "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production";

const TodoContainer = styled.div`
  border: 1px solid #c8c8c8;
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 20px;
  text-align: center;
`;

function Todos() {
  const accessToken = localStorage.getItem("access_token");
  const basic_headers = { Authorization: `Bearer ${accessToken}` };
  const post_headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const [todos, setTodos] = useState(null);
  const [todoContent, setTodoContent] = useState("");

  const initTodoList = () => {
    axios
      .get(API_URL + "/todos", {
        headers: basic_headers,
      })
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        console.log("get todos failed...", error);
      })
      .then("get todos api success");
  };

  useEffect(() => {
    initTodoList();
  }, []);

  const deleteTodo = (id) => {
    axios
      .delete(API_URL + "/todos/" + id, {
        headers: basic_headers,
      })
      .then((res) => {
        console.log("delete success", res.data);
        initTodoList();
      })
      .catch((error) => {
        console.log("delete todo failed...", error);
      })
      .then("delete todo api success");
  };

  const editTodo = () => {
    console.log(todos);
  };

  const TodoList = ({ todo, index }) => {
    return (
      <TodoContainer>
        <div>
          <div>할 일 : {todo.todo}</div>
          <div>완료 여부 : {todo.isCompleted ? "완료" : "미완료"}</div>
        </div>
        <div>
          <button
            onClick={() => {
              editTodo();
            }}
            style={{ marginRight: 5 }}
          >
            수정
          </button>
          <button onClick={() => deleteTodo(todo.id)}>삭제</button>
        </div>
      </TodoContainer>
    );
  };

  const _handleAddTodo = () => {
    axios
      .post(
        API_URL + "/todos",
        {
          todo: todoContent,
        },
        {
          headers: post_headers,
        }
      )
      .then((res) => {
        console.log(res);
        setTodoContent("");
        initTodoList();
      })
      .catch((error) => {
        console.log("post todos failed...", error);
      })
      .then("post todos api success");
  };

  return (
    <div>
      <div>
        <Title>할 일 목록</Title>
        <div style={{ marginTop: 10, marginBottom: 10 }}>
          <input
            placeholder="할 일을 입력하세요."
            style={{ width: 300, height: 30, marginRight: 5 }}
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
          />
          <button onClick={() => _handleAddTodo()}>추가</button>
        </div>
      </div>
      {accessToken === null ? (
        <Navigate to="/"></Navigate>
      ) : todos !== null ? (
        todos.map((todo, index) => (
          <TodoItem key={todo.id} todo={todo} initFunc={initTodoList} />
        ))
      ) : (
        ""
      )}
    </div>
  );
}

export default Todos;
