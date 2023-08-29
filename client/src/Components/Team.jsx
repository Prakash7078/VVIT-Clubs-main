import { motion } from "framer-motion";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Team = (props) => {
    const value=props;
    const {data}=value;
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <div id="team" className="bg-[#fbe9e7] pb-10">
        <section className="">
          <div className=" px-4 mx-auto max-w-screen-xl text-center pt-10 ">
            <div className="mx-auto mb-8 max-w-screen-sm ">
              <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-black">
                Our Team
              </h2>
              <p className="font-light sm:text-xl">
                Coordinators
              </p>
            </div>
            <div className="md:block  cursor-pointer sm:mx-20 pt-5  ">
              <Splide
                options={{
                  rewind: true,
                  perPage:3,
                  breakpoints: {
                    769: {
                      perPage: 1,
                    },
                    1000:{
                      perPage:2,
                    },
                    1024:{
                      perPage:3,
                    }
                  },
                  arrows: true,
                }}
                aria-label="React Splide Example"
                data-splide-interval="1000"
              >
              {data.filter((item)=>item.category==="Coordinator").map((member, index) => {
                return (
                  <SplideSlide key={index} className="mx-auto md:mx-0">
                    <div className="text-center text-gray-700 w-fit md:mr-5 mx-auto md:mx-0">
                      <img
                        className="h-80 md:h-60 w-96 md:w-80 object-cover "
                        src={member.userimage}
                        alt="Bonnie Avatar"
                      />
                      <div className="bg-white pb-5">
                        <h3 className="mb-1 text-2xl font-bold tracking-tight">
                          <p>{member.name}</p>
                        </h3>
                        <p>{member.branch}</p>
                        <p>{member.roll}</p>                    
                        <Link to={`${member.roll}/profile`}><Button color="brown" className="mt-3">Profile</Button></Link>               
                      </div>
                    </div>
                  </SplideSlide>
                );
              })}
            </Splide>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Team;