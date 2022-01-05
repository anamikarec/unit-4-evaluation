import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { msgSuccess } from "../redux/msg/action";
function LeaveMsg() {
  const dispatch = useDispatch();
  const [userMsg, setUserMsg] = useState("");
  const { msg } = useSelector((state) => state.msg);
  // console.log(printMsg, "hello");
  const handleAdd = () => {
    const action = msgSuccess(userMsg);
    dispatch(action);
  };
  return (
    <div>
      <h3
        style={{
          background: "aqua",
          padding: "10px",
          border: "2px solid blue",
          borderRadius: "10px",
          margin: "auto",
          marginTop: "10px",
          width: "300px"
        }}
      >
        {msg}
      </h3>
      <input
        style={{
          height: "30px",
          borderRadius: "10px",
          border: "2px solid blue",
          marginTop: "20px"
        }}
        type="text"
        placeholder="Leave a msg"
        onChange={(e) => setUserMsg(e.target.value)}
      />
      <button
        style={{
          height: "40px",
          borderRadius: "10px",
          border: "2px solid blue",
          background: "black",
          color: "white"
        }}
        onClick={handleAdd}
      >
        MSG
      </button>
    </div>
  );
}

export default LeaveMsg;
