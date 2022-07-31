import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import { db } from "../firebase";
import "./reponsive.css"


const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, "blogs");
      const blogs = await getDocs(blogRef);
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      blogs.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
    };

    getBlogsData();
  }, []);
  

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
    setActive(null);
  };
  return (
    
    <div className="single ">
      <div
        className="blog-title-box bg-cover bg-center "
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="h-screen w-full justify-center flex items-end">
         <div className="mb-16 text-center"> <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2 className="text-3xl text-white">{blog?.title}</h2></div>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="flex rl-mr rl-block ml-28 ">
            <div className="w-4/6 rl-full rl-mr ">
              <span className="flex border-b">
                By: <p className="ml-2 font-bold">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
              </span>
              <p className="mt-3">{blog?.description}</p>
            </div>
            <div className="w-2/6 ml-6 rl-full rl-mr ">
            <Tags tags={tags} />
             
              <MostPopular blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;