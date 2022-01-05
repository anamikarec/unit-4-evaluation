// import { useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import {
//   getTodosFailure,
//   getTodosRequest,
//   getTodosSuccess,
//   removeTodo,
//   toggleTodo
// } from "../redux/app/action";
// import { getTodos } from "./api";

// function TodoItem({ title, status, onDelete, id, onToggle }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         padding: "1rem",
//         gap: "2rem",
//         border: "2px solid blue",
//         borderRadius: "10px",
//         background: "cornsilk",
//         margin: "10px"
//       }}
//     >
//       <div
//         style={{
//           background: "black",
//           padding: "10px",
//           fontSize: "17px",
//           color: "white",
//           border: "2px solid blue",
//           borderRadius: "10px",
//           margin: "10px",
//           width: "250px"
//         }}
//       >
//         {title}
//       </div>
//       <div
//         style={{
//           background: "black",
//           padding: "10px",
//           fontSize: "17px",
//           color: "white",
//           border: "2px solid blue",
//           borderRadius: "10px",
//           margin: "10px",
//           width: "150px"
//         }}
//       >{`${status}`}</div>
//       <button
//         style={{
//           background: "black",
//           padding: "5px",
//           fontSize: "17px",
//           color: "white",
//           border: "2px solid blue",
//           borderRadius: "10px",
//           margin: "10px",
//           width: "150px"
//         }}
//         onClick={() => onDelete(id)}
//       >
//         Delete
//       </button>
//       <button
//         style={{
//           background: "black",
//           padding: "10px",
//           fontSize: "17px",
//           color: "white",
//           border: "2px solid blue",
//           borderRadius: "10px",
//           margin: "10px",
//           width: "200px"
//         }}
//         onClick={() => onToggle(id)}
//       >
//         Toggle Status
//       </button>
//     </div>
//   );
// }

// function TodoList() {
//   const { todos, isLoading, isError } = useSelector(
//     (state) => state.app,
//     shallowEqual
//   );

//   const dispatch = useDispatch();

//   // console.log(count)

//   useEffect(() => {
//     // getTodos(dispatch);
//     dispatch(getTodos());
//   }, []);

//   const handleDelete = (id) => {
//     const action = removeTodo(id);
//     dispatch(action);
//   };

//   const handleToggle = (id) => {
//     const action = toggleTodo(id);
//     dispatch(action);
//   };
//   return (
//     <div style={{ width: "60%", margin: "auto" }}>
//       {isLoading && <h3>Loading...</h3>}
//       {isError && <h3> Something went wrong!</h3>}
//       {todos.map((item) => (
//         <TodoItem
//           key={item.id}
//           {...item}
//           onDelete={handleDelete}
//           onToggle={handleToggle}
//         />
//       ))}
//     </div>
//   );
// }

// export default TodoList;

import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  addTodosFailure,
  addTodosRequest,
  addTodosSuccess
} from "../redux/app/action";
import { addTodos, getTodos } from "./api";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function Todo() {
  const dispatch = useDispatch();
  // 1. write a getTodos function, once you are done with adding, invoke getTodos
  // 2.separate into a separate file
  const handleAdd = (text) => {
    dispatch(addTodos(text)).then((res) => {
      dispatch(getTodos());
    });
  };

  return (
    <div>
      <TodoInput onAdd={handleAdd} />
      <TodoList />
    </div>
  );
}

export default Todo;
