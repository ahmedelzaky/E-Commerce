import Spinner from "react-bootstrap/Spinner";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually m-4">Loading...</span>
      </Spinner>
    </div>
  );
};

export default LoadingScreen;
