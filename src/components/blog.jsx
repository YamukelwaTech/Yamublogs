import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalStateContext } from "../GlobalStateContext";
import LazyLoad from 'react-lazyload';
import right from "../assets/Icons/right.png";

const Blog = () => {
  const { articles } = useContext(GlobalStateContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Logging article tokens once when articles change:");
    articles.forEach((article) => {
      console.log("Token:", article.token);
    });

    if (articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  return (
    <div className="w-full p-12 bg-customColor1">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-semibold text-customColor2">
            Fetching all the latest posts...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-end justify-between mb-12 header">
            <div className="title md:ml-20">
              <p className="mb-4 text-3xl font-bold text-customColor2">
                Latest YamuBlogs
              </p>
              <p className="text-sm md:text-xl font-semibold text-customColor2 flex items-center">
                All articles are verified
                <span className="ml-2 text-customColr2">
                  <img src={right} alt="Right Icon" className="h-4 w-4 md:h-6 md:w-6" />
                </span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
            {articles.map((article) => {
              return (
                <div
                  key={article.token}
                  className="m-auto overflow-hidden rounded-lg shadow-lg cursor-pointer h-90 w-72 md:w-80 xl:w-91"
                >
                  <Link to={`/post/${article.token}`} className="block w-full h-full">
                    <LazyLoad height={200} offset={100}>
                      <img
                        alt={article.title}
                        src={article.backgroundimg || "/images/blog/default.jpg"}
                        className="object-cover w-full max-h-40"
                      />
                    </LazyLoad>
                    <div className="w-full p-4 dark:bg-customColor5">
                      <p className="mb-2 text-xl font-medium text-gray-800 dark:text-white">
                        {article.title}
                      </p>
                      <p className="font-light text-black dark:text-gray-300 text-md">
                        {article.description}
                      </p>
                      <div className="flex items-center mt-4">
                        <div className="relative block">
                          <img
                            alt={article.author.name}
                            src={article.imageURL || "/images/person/default.jpg"}
                            className="mx-auto object-cover rounded-full h-10 w-10"
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 text-sm">
                          <p className="text-black dark:text-white">
                            {article.author.name}
                          </p>
                          <p className="text-gray-400 dark:text-gray-300">
                            {new Date(article.publishedDate).toLocaleDateString()} -{" "}
                            {article.readTime} min read
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
