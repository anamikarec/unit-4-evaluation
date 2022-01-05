const Pagination = ({ totalPage, onClickCallback, currentPage }) => {
  const pages = new Array(totalPage).fill(0).map((_, i) =>
    i + 1 === currentPage ? (
      <button key={i} disabled>
        {i + 1}
      </button>
    ) : (
      <button key={i} onClick={() => onClickCallback(i + 1)}>
        {i + 1}
      </button>
    )
  );
  return <div styles={{ display: "flex", gap: "1rem" }}>{pages}</div>;
};

export default Pagination;
