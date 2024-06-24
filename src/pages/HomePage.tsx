import CategoryFilter from "../components/CategoryFilter";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import { useEffect } from "react";
import { fetchArticles } from "../store/articleSlice";
import ArticleCard from "../components/ArticleCard";
import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { articles, status, error, category, page } = useAppSelector(
    (state: RootState) => state.articles
  );
  console.log(articles);

  useEffect(() => {
    dispatch(fetchArticles({ category, page }));
  }, [dispatch, category, page]);

  return (
    <div className="container  mx-auto px-4 ">
      <CategoryFilter />
      {status === "loading" && <Loader />}
      {status === "failed" && (
        <div className="text-center m-10 flex items-center justify-center h-[60vh]">
          Error: {error}
        </div>
      )}
      {articles.length === 0 && (
        <div className="text-center m-10 flex items-center justify-center h-[60vh]">
          <h2 className="text-3xl">No page to Display</h2>
        </div>
      )}
      {status === "succeeded" && (
        <div className="flex flex-wrap justify-center gap-8">
          {articles.map(
            (article) =>
              //removing articles which are removed and which don't have images
              article.content !== "[Removed]" &&
              article.urlToImage && (
                <ArticleCard key={article.url} article={article} />
              )
          )}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default HomePage;
