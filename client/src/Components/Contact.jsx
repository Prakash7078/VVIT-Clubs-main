import  {useRef, useState } from 'react'

import emailjs from '@emailjs/browser'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { BASE_URL } from '../config/url';
import { useSelector } from 'react-redux';
function Contact() {
  // const form = useRef();
  const userInfo = useSelector((state) => state.auth.userInfo);
 const navigate=useNavigate();
  const [name,setName]=useState('');
  const[text,setText]=useState('');
  const[email,setEmail]=useState('');
  const msgHandler=async(e)=>{
    e.preventDefault();  
    //serviceID,templateID,form,public key
    // emailjs.sendForm('service_a2zj3nf', 'template_qs0kz2b', form.current, 'y2GRM_qsFn95-TOCY')
    // .then((result) => {
    //     console.log("result",result.text);
    // },(error) => {
    //     console.log(error.text);
    // });
    if(userInfo){
      try{
        const rollno=userInfo.rollno;
        await axios.post(`${BASE_URL}/api/msgs/send`,{
            name,
            email,
            rollno,
            text,
        });
        window.location.reload();
      }catch(err){
          toast.error("check details...");
      }
    }else{
      toast.error("Please Login to application");
      navigate('/login');
    }
  }     

  return (
    <div id="contact" className="text-gray-600 body-font relative bg-[#fcf0cd]">
         <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center mb-12">
              <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-black">
                Contact Us
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                If you&apos;d like to get in touch with us, feel free to reach out
                using the contact information below or by filling out the contact
                form.
              </p>
            </div >
            <div className="lg:w-1/2 md:w-2/3 mx-auto ">
              <form
                // ref={form}
                onSubmit={msgHandler}
                className="flex flex-wrap "
                action="#"
              >
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-800"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-800 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-800"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-500 focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-brown-500 border-0 py-2 px-8 focus:outline-none rounded text-lg">
                  Submit
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-brown">20bq1a05j5@vvit.net</a>
                <p>+91 9704688559</p>
                <p className="leading-normal my-5">
                  VVIT College Rd, Namburu,
                  <br />
                  Andhra Pradesh 522508, India
                </p>
              </div>
            </form>
            </div>
          </div>
    </div>
  )
}

export default Contact