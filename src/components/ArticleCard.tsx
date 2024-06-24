import { Article } from "../types";

const ArticleCard = ({ article }: { article: Article }) => {
  const truncatedDescription = `${article.description
    ?.split(" ")
    .slice(0, 15)
    .join(" ")}...`;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg pb-3 flex flex-col justify-between">
      <div>
        <img
          className="w-full h-52"
          src={article.urlToImage}
          alt={article.title}
        />
        <div className="px-6 py-4">
          <div className="font-bold  text-[18px] mb-2">{article.title}</div>
          <p className="text-gray-700 text-sm">{truncatedDescription}</p>
        </div>
      </div>
      <div className="px-6 pt-4 pb-2 ">
        <a
          href={`/article/${article.source.id || article.source.name}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
