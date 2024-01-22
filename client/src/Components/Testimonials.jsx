import { Rating } from "@material-tailwind/react";

const testimonials = [
  {
    quote:
      "“Finally, I've found a company that delivers outstanding results in digital marketing, education, and hospitality. Atoms Group has exceeded my expectations, and their expertise has truly helped my business grow.”",
    author: "Chairman Sir",
    position: "CEO, Example Company",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
  {
    quote:
      "“Working with Club Team has been a game-changer for my online presence. Their strategic approach and attention to detail have boosted my brand's visibility and engagement. I highly recommend their services.”",
    author: "Principal Sir",
    position: "Founder, XYZ Startup",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
  {
    quote:
      "“Club Teams is a reliable partner that has transformed our digital marketing efforts. Their team's expertise and innovative solutions have significantly increased our online reach and conversions.”",
    author: "Club Incharge",
    position: "Marketing Director, ABC Company",
    avatar: "https://booktalks.s3.ap-south-1.amazonaws.com/istockphoto-1305665241-1024x1024.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 bg-[#fff3e0] item" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
        <h2 className="md:text-4xl text-3xl font-semibold text-center text-gray-800 mt-10 mb-16">
          Our Client&apos;s Words
        </h2>
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className=" relative pb-10"
            >
              <div className="shadow-lg bg-[#fde6be] p-4 flex flex-col h-96 sm:h-80 gap-4 mx-auto rounded-md  overflow-hidden">
                <div className=" mx-auto tracking-wider px-2">
                  <p className=" text-gray-600">{testimonial.quote}</p>
                </div>
                <div className="text-center">
                    <Rating value={5} readonly/>
                  </div>
                <div className=" text-center">
                    <h1 className="font-bold">{testimonial.author}</h1>
                    <p>{testimonial.position}</p>
                </div>
              </div>
              <div className="absolute w-full bottom-0 ">
                <img
                    className="h-20 bottom-0  w-20 rounded-full object-cover mx-auto"
                    src={testimonial.avatar}
                    alt="Testimonial Avatar"
                  />
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;