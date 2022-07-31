import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import * as AiIcons from 'react-icons/ai';
import "../pages/reponsive.css"

const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className="border-b border-zinc-500 text-left">Daily Blogs</div>
      {blogs?.map((item) => (
        <div className="mt-9 flex rl-block " key={item.id}>
          <div className=" w-2/6 rounded-md rl-full">
            <div className=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110">
              <div className="w-full  ">
                <img className="h-44 rounded-md rl-full rl-mr " src={item.imgUrl} alt={item.title} />
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-4/6 ml-8 rl-full rl-mr">
            <div className=" ">
              <div>
              <p className="bg-emerald-500 w-24 rounded-md text-sm text-center">{item.category}</p>
              <p className=" text-left  text-slate-900 font-bold ">{item.title}</p>
             
              <span className="  "></span>
              </div>

              <span className="flex">
                <p className="font-bold mr-1">{item.author} </p>  -&nbsp;
                {item.timestamp.toDate().toDateString()}
              </span>
            </div>
            <div className="h-2/5 text-slate-400 mt-2">
            {excerpt(item.description, 120)}
            </div >
            


            <div className="flex rl-mr justify-between " >
            <Link to={`/detail/${item.id}`}>
              <button className="bg-cyan-700  p-0.5 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 rp-5">Read More</button>
            </Link>
            {userId && item.userId === userId && (
              <div className="flex mr-5 ">
              <Link to={`/update/${item.id}`}><p className=" text-2xl mr-3 text-amber-300 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110"><AiIcons.AiFillEdit/></p></Link>
              
              <a className=" text-2xl text-red-500 transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110" onClick={() => handleDelete(item.id)}><AiIcons.AiFillDelete/></a>
              </div >
              )}
            
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default BlogSection;