import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchArticles, setPage } from "../store/articleSlice";
import { RootState } from "../store/index";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { category, page } = useAppSelector(
    (state: RootState) => state.articles
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
    dispatch(fetchArticles({ category, page: newPage }));
  };

  return (
    <div className="flex justify-center space-x-4 m-5">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Previous
      </button>
      <span>{page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
