import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Return to previous page
      </button>
    </div>
  );
};

export default NotFound;
