import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Article } from "../types";
import Loader from "../components/Loader";

const API_KEY = import.meta.env.VITE_API_KEY;

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything`, {
          params: {
            qInTitle: id,
            apiKey: API_KEY,
          },
        });
        if (response.data.articles.length > 0) {
          setArticle(response.data.articles[0]);
        } else {
          setError("Article not found");
        }
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  return (
    <div className="container mx-auto px-4 lg:px-20 lg:pb-10">
      {loading && <Loader />}
      {error && (
        <div className="text-center m-10 flex items-center justify-center h-[60vh]">
          Error: {error}
        </div>
      )}

      {article && (
        <>
          <h1 className="text-4xl font-bold">{article.title}</h1>
          {article.urlToImage && (
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full my-4"
            />
          )}
          <p className="text-gray-700 text-lg mb-3">{article.content}</p>
          <Link className="text-blue-500 " to={article.url}>
            Readmore...
          </Link>
        </>
      )}
    </div>
  );
};

export default ArticleDetailPage;
