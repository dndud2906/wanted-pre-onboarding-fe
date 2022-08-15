import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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

function TodoItem({ todo, initFunc }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const [editCompleted, setEditCompleted] = useState(todo.isCompleted);

  const accessToken = localStorage.getItem("access_token");
  const basic_headers = { Authorization: `Bearer ${accessToken}` };
  const post_headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const _handleToggleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const _handleToggleCompleted = () => {
    setEditCompleted((prev) => !prev);
  };

  const deleteTodo = (id) => {
    axios
      .delete(API_URL + "/todos/" + id, {
        headers: basic_headers,
      })
      .then((res) => {
        console.log("delete success", res.data);
        initFunc();
      })
      .catch((error) => {
        console.log("delete todo failed...", error);
      })
      .then("delete todo api success");
  };

  const editTodo = (id) => {
    axios
      .put(
        API_URL + "/todos/" + id,
        { todo: editText, isCompleted: editCompleted },
        {
          headers: post_headers,
        }
      )
      .then((res) => {
        console.log("update success", res.data);
        _handleToggleEdit();
        initFunc();
      })
      .catch((error) => {
        console.log("update todo failed...", error);
      })
      .then("update todo api success");
  };

  return (
    <TodoContainer>
      {!isEdit ? (
        <>
          <div>
            <div>할 일 : {todo.todo}</div>
            <div>완료 여부 : {todo.isCompleted ? "완료" : "미완료"}</div>
          </div>
          <div>
            <button
              onClick={() => {
                _handleToggleEdit();
              }}
              style={{ marginRight: 5 }}
            >
              수정
            </button>
            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 5 }}>할 일 :</div>
              <input
                placeholder="할 일을 입력해주세요."
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: 5 }}>완료 여부 :</div>
              <button
                onClick={() => {
                  _handleToggleCompleted();
                }}
              >
                {editCompleted ? "완료" : "미완료"}
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={() => {
                _handleToggleEdit();
              }}
              style={{ marginRight: 5 }}
            >
              취소
            </button>
            <button
              onClick={() => {
                editTodo(todo.id);
              }}
            >
              수정
            </button>
          </div>
        </>
      )}
    </TodoContainer>
  );
}

export default TodoItem;
