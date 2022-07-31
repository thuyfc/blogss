import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import BlogSection from "../components/BlogSection";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
import Trending from "../components/Trending";
import "./reponsive.css"


const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [trendBlogs, setTrendBlogs] = useState([]);

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, "blogs");
    const trendQuery = query(blogRef, where("trending", "==", "yes"));
    const querySnapshot = await getDocs(trendQuery);
    let trendBlogs = [];
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() });
    });
    setTrendBlogs(trendBlogs);
  };
  useEffect(() => {
    getTrendingBlogs();
    const unsub = onSnapshot(
      collection(db, "blogs"),
      (snapshot) => {
        let list = [];
        let tags = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        setBlogs(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getTrendingBlogs();
    };
  }, []);
  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that blog ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "blogs", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full rl-full   flex  sm:justify-center items-center ">
      <div className="p-2 w-5/6 rl-full">
        <div className="text-center">
          <Trending blogs={trendBlogs} />

        </div>
        <div className='flex margins rl-block rl-blocks '>
          <div className="w-4/6 rl-full  ">
            <BlogSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className="w-2/6 ml-5 rl-full rl-mr">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>

      </div>

    </div>
  )
}

export default Home