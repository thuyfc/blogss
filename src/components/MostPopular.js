import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/reponsive.css"

const MostPopular = ({ blogs }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="text-left  border-b border-zinc-500 ">Most Popular</div>
      {blogs?.map((item) => (
        <div
          className="flex mt-5 rl-mr 
          "
          key={item.id}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          <div className="w-2/6 h-20 h-rp ">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="rounded-md rp-h rl-full transition ease-in-out delay-150 h-20   hover:-translate-y-1 hover:scale-110"
            />
          </div>
          <div className="ml-8 w-4/6 rl-mr rp-h ml-rp">
            <div className="text-left">{item.title}</div>
            <div className="text-slate-400 text-left">
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostPopular;