import { useEffect} from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../redux/clubSlice';
import { Rings } from 'react-loader-spinner';
import { Button} from "@material-tailwind/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Categories() {
   const dispatch = useDispatch();
   const clubs=useSelector((state)=>state.clubs.clubs);
   const load=useSelector((state)=>state.clubs.load);
    useEffect(()=>{
        const fetchData=async()=>{
            await dispatch(getClubs());
        }
        fetchData();
    },[dispatch]);
    if (load) {
        return (
          <div className="flex justify-center items-center h-screen">
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
      slidesToScroll: 1,
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
          },
        },
        {
          breakpoint: 580,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
  
  return (
    // <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay:0.1  }}>
      <div id='category' className='bg-[#fff3e0] pb-10 pt-5'>
          <div className='mb-10 mt-8 flex flex-col gap-2 items-center'>
              <h1 className='font-bold text-4xl'>Club Events</h1>
              <h3>Choose Event</h3>
          </div>
         <div className='mx-7'>
          <Slider {...settings}>
              {clubs.map((product, index) => {
                return (
                  <div key={index} >
                      <Link to={`/${product.name}`} key={index}>
                          <div className='m-0 sm:m-5 shadow-2xl pb-4 bg-white hover:scale-105 transition-all duration-500'>
                            <img src={product.image} className=' cursor-pointer w-full h-60 object-cover  rounded-t-lg mb-10' alt='event'/>
                              <div className='flex justify-between items-center'>
                                <h1 className='font-bold ml-4'>{product.name}</h1>
                                <Link to={`/${product.name}`}>
                                    <Button className='bg-[#8d6e63] text-white py-2 px-2 mr-4 rounded-md'>Know More&gt;&gt;</Button>
                                </Link>        
                              </div>
                          </div>
                      </Link>                 
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
    // </motion.div>
  )
}

export default Categories