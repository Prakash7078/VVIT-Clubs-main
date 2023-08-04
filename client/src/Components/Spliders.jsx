import vvit from '../Images/vvit-main.jpeg'
import Nani from '../Images/Nani.jpg'
import theater from '../Images/theatre.jpeg'
import dance from '../Images/dance.jpg'
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
function Spliders() {
    const images=[vvit,Nani,theater,dance]
  return (
    <div id="home" className='bg-[#fff3e0] grid md:grid-cols-2 py-20' >
        <div className='flex flex-col items-center justify-center w-full'>
          <h1 className='font-bold text-4xl pb-10'>Welcome </h1>
          <p className='sm:w-fit sm:px-20 w-full px-11'>To achieve a zoom-in and zoom-out effect on the background image like a movie shot, you can use CSS animations and keyframes. Here's how you can modify the Brand component to achieve this effect:</p>
        </div>
        <div className="md:block  cursor-pointer sm:mx-20 pt-10  ">
          <Splide
            options={{
              rewind: true,
              perPage:1,
              speed:500,
              arrows: true,
              interval: 1000,
              autoplay: true,
            }}
            aria-label="React Splide Example"
            data-splide-interval="1000"
          >
            {images.map((image, index) => {
              return (
                <SplideSlide key={index} className=''>
                <img className='object-cover rounded  'src={image} alt="Banner" />
              </SplideSlide>
              );
            })}
          </Splide>
      </div>
    </div>
  )
}

export default Spliders