import React, { useState, useEffect, useRef } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import {useDispatch, useSelector} from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { Card, CardHeader, CardBody } from '@material-tailwind/react';
import io from 'socket.io-client';
import { getChats} from '../redux/chatSlice';
import axios from 'axios';
import { SOCKET_URL} from '../config/url';

const socket = io(`${SOCKET_URL}`, {
  transport: ["websocket"],
});

const Chat = () => {
  // const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch=useDispatch();
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const msgs=useSelector((state)=>state.chats.chatsdata);
  const userInfo=useSelector((state)=>state.auth.userInfo);
  const[messages,setMessages]=useState([]);
  const chatContainerRef = useRef(null);
  // const emojiPickerRef = useRef(null);
  useEffect(() => {
    const fetchChats = async () => {
      try {
        await dispatch(getChats());
        console.log("setMessages",messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChats();
    setMessages(msgs);
  },[dispatch,msgs]);
  useEffect(() => {
    // Socket.IO event listeners
    
    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Cleanup on component unmount
      socket.off("message");
    };
  }, [messages]);
  
  


  const handleInputChange = (event) => {
    setMessage(event.target.value);
    console.log("message",message);
  };
  const handleSendMessage =async () => {
    if (message.trim() !== '') {
      const newMessage = {
        user: userInfo.username,
        message: message,
        likes: 0,
        img:userInfo.image,
      };
      setMessages([...messages, newMessage]);
      // Add the new message to the chatMessages array
      socket.emit("message", newMessage);
      setMessage('');
    }
  };
  
  


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };
  const handleLike=async(id)=>{
    await axios.patch(`${SOCKET_URL}/api/chat/${id}`);
    await dispatch(getChats());
  }
  const handleSelectEmoji = (emoji) => {
    const emojee = emoji.emoji;
    setMessage((prevMessage) => prevMessage + emojee);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker((prevState) => !prevState);
  };

 

  return (
    <div className="bg-white sm:mt-40 mt-32  ">
         <Card className='w-fit mx-auto bg-pink-700 text-white '>
            <CardHeader
            variant='gradient'
            color='green'
            className='mx-auto p-2 font-bold px-10 '>
            Chat
            </CardHeader>
            <CardBody className='md:w-[40rem]  flex flex-col justify-between'>
                <div className="mb-10" ref={chatContainerRef}>
                    {messages.length>0 && messages.map((chat, index) => (
                    <div className="flex  justify-between gap-5 my-5" key={index}>
                        <div className='flex flex-wrap gap-4'>
                            <img className='w-6 h-6 rounded-full' src={chat.image} alt='userimage'/>
                            <span className="font-bold ">{chat.user}:</span>
                            <span className="" dangerouslySetInnerHTML={{ __html: chat.text }}></span>
                                <button className="" >
                                <AiFillLike color='gold' onClick={()=>handleLike(chat._id)} />
                                </button>
                            <span className="">{chat.likes}</span>
                        </div>
                        <br />
                        <span className="">{new Date(chat.createdAt).toLocaleTimeString()}</span>
                    </div>
                    ))}
                </div>
                <div className="flex justify-between gap-5">
                    <input
                    className="w-full text-black"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    />
                    <div className='flex gap-2'>
                      <button onClick={handleToggleEmojiPicker} className="">
                      😀
                      </button>
                      <button onClick={handleSendMessage}>
                      <FaPaperPlane className="bg-white" color='green' size={20}/>
                      </button>
                    </div>
                    <div  className="absolute bottom-20">
                      {showEmojiPicker && (
                            <EmojiPicker  onEmojiClick={handleSelectEmoji} onClick={handleSelectEmoji}/>
                        )}

                    </div>
                </div>
            </CardBody>
      </Card>
    </div>
  );
};

export default Chat;