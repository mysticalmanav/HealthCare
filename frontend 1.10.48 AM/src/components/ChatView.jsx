import { useState, useRef, useEffect, useContext } from "react";
import Message from "./Message";
import { ChatContext } from "../context/chatContext";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import { replaceProfanities } from "no-profanity";
import axios from 'axios';
import Select from 'react-select';
import symptoms from '../assets/symptoms.js'; // Make sure this path is correct
  
const template = [
  {
    title: "How to use",
    prompt: "Welcome to our Health Care Chatbot! Simply enter your symptoms in the chat box, and our intelligent assistant will provide possible diagnoses and helpful information. Please note, this tool is for informational purposes and not a substitute for professional medical advice. For serious concerns, consult a healthcare provider. We're here to assist you 24/7.",
  },
];

const ChatView = ({thm}) => {
  const messagesEndRef = useRef();
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [selected, setSelected] = useState(false);
   
  const [messages, addMessage, clearChat, deleteMessage, sliceMessages] = useContext(ChatContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEmptyResponse, setIsEmptyResponse] = useState(false); // State to track empty response
  const flagRef = useRef(1);
  
  // Listen for changes in localStorage 
   
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const slowScrollToBottom = () => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      const scrollStep = 5;
      const scrollInterval = setInterval(() => {
        if (chatContainer.scrollTop + chatContainer.clientHeight < chatContainer.scrollHeight) {
          chatContainer.scrollTop += scrollStep;
        } else {
          clearInterval(scrollInterval);
        }
      }, 16);  
    }
  };
  const updateMessage = async (newValue, ai = false, selected, showSatisfactionPrompt = false) => {
    const id = Date.now() + Math.floor(Math.random() * 1000000);
    const newMsg = {
      id: id,
      createdAt: Date.now(),
      text: newValue,
      ai: ai,
      showSatisfactionPrompt: showSatisfactionPrompt,
      selected: `${selected}`,
    };
    await addMessage(newMsg);
  };

  const handleSatisfactionResponse = async (messageId, satisfied) => {
    const index = messages.findIndex(msg => msg.id === messageId);
    if (index !== -1) {
      if (satisfied) {
        flagRef.current = 1;
        setThinking(false);
        await sliceMessages(index);
      } else {
        await deleteMessage(messageId);
      }
    }
    scrollToBottom();
  };
  useEffect(() => {
    autoGrow(); // Adjust height on initial render
  }, [formValue]);
  const autoGrow = () => {
    const element = inputRef.current;
    if (formValue == '') {
    if(element)  element.style.height = 48 + 'px';
    }
    if (element) {
       
      element.style.height = element.scrollHeight + 'px';
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();
    const cleanPrompt = formValue;
    if (!formValue) return;
    if (formValue.trim().length == 0) return;
    const req = formValue;
    const aiModel = selected;
    
    flagRef.current = 0;
    setThinking(true);
    setFormValue("");
    await updateMessage(cleanPrompt, false, aiModel);
    
    try {
      const response = await axios.post(
        'https://c195-35-227-4-55.ngrok-free.app/endpoint1',
        { prompt: req },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }

      );
      console.log(response.data);
      await updateMessage(response.data.data, true, aiModel);
      setThinking(false)
      flagRef.current=1
    } catch (error) {
      console.error('Error making request:', error);
      // Handle error appropriately, e.g., show a message to the user
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter"&&flagRef.current) {
      sendMessage(e);
    }
  };

  useEffect(() => {
    
  }, [thinking, messages]);

  useEffect(() => {
   if(inputRef.current) inputRef.current.focus();
  }, []);

  const Compo = () => {
    let components = [];
    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      components.push(
        <Message key={index} message={{ ...message }} onSatisfactionResponse={handleSatisfactionResponse} />
      );
      if (message.showSatisfactionPrompt) break;
    }
    slowScrollToBottom();
    return components;
  };

  const symptomOptions = symptoms.map(symptom => ({ label: symptom, value: symptom }));

  return (
    <main className="w-full relative flex flex-col h-screen p-2 overflow-hidden bg-base-200 text-base-content">
      <section className="chat-container flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32 my-4">
        { 
          messages.length ? (
            <Compo />
          ) : (
            <div className="flex my-2 w-full">
              <div className="w-full">
                <ul className="gap-4 w-full mt-8">
                  {template.map((item, index) => (
                    <li key={index} className="p-6 border rounded-lg border-slate-300 hover:border-slate-500">
                      <p className="text-base font-semibold text-lg">{item.title}</p>
                      <p className="text-md">{item.prompt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
        {thinking && <Thinking />}
        <span ref={messagesEndRef}></span>
      </section>
       
  <form
    className="flex flex-col px-10 mb-2 md:px-32 join sm:flex-row"
    onSubmit={sendMessage}
  >
    <div className="flex justify-between w-full items-end">
      <textarea
        ref={inputRef}
        className="textarea textarea-bordered w-full p-[0.6rem] min-h-12 h-12 mx-2 resize-none overflow-y-auto box-border bg-base-200 disabled:cursor-not-allowed"
        value={formValue}
        onChange={(e) => {
          setFormValue(e.target.value);
          autoGrow(); // Adjust height on change
        }}
        onKeyDown={handleKeyDown}
        placeholder="Enter symptoms"
        disabled={flagRef.current === 0}
      />
      <button
        type="submit"
        className="join-item btn btn-primary btn-md"
        disabled={formValue.trim() === '' || flagRef.current === 0}
      >
        <MdSend size={30} />
      </button>
    </div>
  </form>

    </main>
  );
  
};

export default ChatView;