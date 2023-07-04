export const Button = ({ onClick }) => {
  return (
    <div className="btnContainer">
      <button className="Button" onClick={onClick}>
        Load more...
      </button>
    </div>
  );
};
