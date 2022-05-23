import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-box">
      <div className="gooey">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
