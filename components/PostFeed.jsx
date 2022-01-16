import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { v4 as uuid } from "uuid";
import axios from "axios";

/*
Account Email: alex.kalinins@mail.utoronto.ca
Account ID: 4fe47cb9-ef29-46b1-ad57-f8a8f2921aec

*/

const BASE_REQUEST = "apod?api_key=3CTRs2uf66v56J6LUkotxNGg2VMdL7NuG0JvNCKG";

/**
 * Converts passed date to ISO 8601 format to be used in the API call.
 *
 * @param {Date} date the date being formated
 * @returns passed date in the ISO 8601 Format
 */
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export default function PostFeed({}) {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [hasData, setHasData] = useState(false);

  // the end date of the api request. The start date would be 10 days before the end date.
  const [reqEndDate, setReqEndDate] = useState(new Date());

  const getMorePosts = async () => {
    const startDate = new Date(reqEndDate);
    startDate.setDate(startDate.getDate() - 10);

    const res = await axios({
      method: "get",
      url: `/api/${BASE_REQUEST}&start_date=${formatDate(
        startDate
      )}&end_date=${formatDate(reqEndDate)}`,
    });

    if (res.data) {
      const newPosts = res.data
        .map((post) => {
          return { ...post, uuid: uuid() };
        })
        .reverse();

      if (posts.length == 0) {
        console.log("poo");

        setPosts(newPosts);
      } else {
        setPosts([...posts, ...newPosts]);
      }

      const newEndDate = new Date(reqEndDate);
      newEndDate.setDate(newEndDate.getDate() - 11);
      setReqEndDate(newEndDate);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    console.log("First time?");
    getMorePosts();
  }, []);

  useEffect(() => {
    console.log("has data? ", hasData);
    console.log("length ", posts.length);
  }, [hasData]);

  return (
    <div className="feedContainer">
      {posts.length && (
        <InfiniteScroll
          dataLength={posts.length}
          next={getMorePosts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<h4>Reached the end...</h4>}
        >
          {posts.map((post) => (
            <Post key={post.uuid} post={post} />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}
