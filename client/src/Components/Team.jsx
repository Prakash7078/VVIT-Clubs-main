import { motion } from "framer-motion";
const Team = (props) => {
    const value=props;
    const {data}=value;
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.3 }}>
      <div id="team" className="bg-[#d7ccc8]">
        <section className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-6">
            <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
              <h2 className="mb-4 text-5xl tracking-tight font-extrabold text-primary">
                Our Team
              </h2>
              <p className="font-light text-secondary sm:text-xl">
                Explore the whole collection of open-source web components and
                elements built with the utility classNamees from Tailwind
              </p>
            </div>
            <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.filter((item)=>item.category==="Coordinator").map((member, index) => {
                return (
                  <div
                    className="text-center text-gray-500 dark:text-gray-400"
                    key={index}
                  >
                    <img
                      className="mx-auto mb-4 w-36 h-36 rounded-full"
                      src={member.userimage}
                      alt="Bonnie Avatar"
                    />
                    <h3 className="mb-1 text-2xl font-bold tracking-tight text-secondary">
                      <p>{member.name}</p>
                    </h3>
                    <p>{member.branch}</p>
                    <p>{member.roll}</p>
                    
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Team;