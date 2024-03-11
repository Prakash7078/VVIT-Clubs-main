import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClubs } from "../redux/clubSlice";
import { Rings } from "react-loader-spinner";
import { Button } from "@material-tailwind/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const clubs = useSelector((state) => state.clubs.clubs);
  const load = useSelector((state) => state.clubs.load);
  const checkLogin = (name) => {
    if (!userInfo) {
      navigate("/login");
    } else {
      navigate(`/${name}`);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getClubs());
    };
    fetchData();
  }, [dispatch]);
  if (load) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#fff3e0]">
        <Rings
          height="80"
          width="80"
          color="#21BF73"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="rings-loading"
        />
      </div>
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay:0.1  }}>
    <div>
      {clubs?.length > 0 && (
        <div id="#category" className="bg-[#fff3e0] py-20 pt-5 ">
          <h1 className="font-bold px-2 text-2xl md:text-4xl text-center ">
            Choose your clubs based on categories
          </h1>

          <div className="md:mx-10 mx-6 mt-16">
            <Slider {...settings}>
              {clubs?.map((product, index) => {
                return (
                  <div key={index}>
                    <div
                      key={index}
                      onClick={() => checkLogin(product.name)}
                      className="m-0 sm:m-5 shadow-xl  relative"
                    >
                      <img
                        src={product.image}
                        className="  w-full h-96 xl:h-72 object-fill rounded-t-lg mb-10"
                        alt="event"
                      />
                      <div className="absolute cursor-pointer left-0 top-0 right-0 bottom-0 backdrop-brightness-50">
                        <div className="absolute bottom-20 inset-x-0 flex flex-col gap-5 text-white items-center">
                          <h1 className="font-bold text-xl">{product.name}</h1>
                          <Button
                            onClick={() => checkLogin(product.name)}
                            className="bg-transparent border py-2 px-4 rounded-md"
                          >
                            Know More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
            <style>{`
                  /* Left Arrow */
                  .slick-prev:before {
                    color: #9C1137;
                  }

                  /* Right Arrow */
                  .slick-next:before {
                    color: #9C1137;
                  }
                `}</style>
          </div>
        </div>
      )}
    </div>

    // </motion.div>
  );
}

export default Categories;
