import { useNavigate } from "react-router-dom";

export default function HistorySection() {
  const navigate = useNavigate();
  return (
    <>
      <button
        style={{
          marginTop: "40px",
          marginLeft: "40px",
          width: "200px",
          paddingBlock: "10px",
          border: "none",
          backgroundColor: "#433D8B",
          color: "white",
          borderRadius: "10px",
        }}
        onClick={() => navigate("/dashboard")}
      >
        ◀︎ Back To Dashboard
      </button>
    </>
  );
}
