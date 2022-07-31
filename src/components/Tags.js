import React from "react";

const Tags = ({ tags }) => {
  return (
    <div>
      <div>
        <div className="  border-b border-zinc-500 text-left">Tags</div>
      </div>
      <div className="flex p-1  ">
        {tags?.map((tag, index) => (
          <p className="p-1 rounded-md bg-slate-200 mr-2" key={index}>
            {tag}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Tags;