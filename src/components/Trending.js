import React from "react";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../pages/reponsive.css"

const Trending = ({ blogs }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div>
        <div className="text-left border-b border-zinc-500">Trending</div>
      </div>
      <Slider className="mt-4 mb-4" {...settings}>
     
       {blogs?.map((item) => (
          <div className="flex px-2  " key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className="relative h-80 flex justify-center items-end ">
                <div className="absolute">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="h-80 w-72 rounded-md rl-full"
                  />
                </div>
             
                <div className="absolute mb-5">
                  <span className="text-stone-200 font-bold">{item.title}</span>
                  <div className="trending-meta-info text-stone-300">
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
     
     </Slider>
    </>
  );
};

export default Trending;