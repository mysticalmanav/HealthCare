import { useState, useEffect, useContext } from "react";
import { MdClose, MdMenu, MdDelete } from "react-icons/md";
import { AiOutlineGithub } from "react-icons/ai";
import { useLocation, Link } from "react-router-dom";
import { ChatContext } from "../context/chatContext";
import bot from "../assets/logo.svg";
import ToggleTheme from "./ToggleTheme";

/**
 * A sidebar component that displays a list of nav items and a toggle
 * for switching between light and dark modes.
 *
 * @param {Object} props - The properties for the component.
 */
const SideBar = (props) => {
  const [, , clearChat] = useContext(ChatContext);
  const { setThm, setOpen, open } = props;
  const location = useLocation();

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function clear() {
    clearChat();
  }

  // Determine the current path
  const currentPath = location.pathname;

  // Define navigation items
  const navItems = [
    { path: '/bot', label: 'AI Bot' },
    { path: '/form', label: 'Myopia Detection' },
    { path: '/test', label: 'Vision Test' },
    { path: '/dashboard', label: 'Dashboard' }, // Added this line
  ];

  return (
    <section
      className={`${
        open ? "w-72" : "w-16"
      } overflow-y-hidden bg-base-200 text-base-content flex flex-col justify-between items-center h-screen pt-4 duration-200`}
    >
      {/* Top Content */}
      <div className="w-full">
        <div className="flex items-center justify-between w-full px-4">
          <div className={`flex items-center gap-2 ${!open && "hidden"}`}>
            <img src={bot} alt="logo" className="w-8 h-8" />
            <h1 className="text-lg font-semibold">HealthCare</h1>
          </div>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdClose size={24} /> : <MdMenu size={24} />}
          </button>
        </div>
        <div className="p-5 flex justify-content-center">
          {localStorage.getItem('name')}
        </div>
        <ul className="w-full menu rounded-box px-4 py-3">
          {currentPath === '/bot' && (
            <li>
              <button
                className="flex items-center gap-2 my-2 w-full py-3 rounded-md hover:bg-neutral-focus"
                onClick={clear}
              >
                <MdDelete size={20} />
                <span className={`${!open && "hidden"}`}>Clear chat</span>
              </button>
            </li>
          )}
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center my-2 gap-2 w-full py-3 px-2 rounded-md hover:bg-neutral-focus ${
                  currentPath === item.path ? 'opacity-50 cursor-default' : ''
                }`}
              >
                <span className={`${!open && "hidden"}`}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Content */}
      <div className="w-full">
        <ul className="w-full px-4">
          <li>
            <ToggleTheme setThm={setThm} open={open} />
          </li>
          <li>
            <a
              className="flex items-center gap-2 w-full py-2 px-2 hover:bg-neutral-focus rounded-md"
              rel="noreferrer"
              target="_blank"
              href="https://github.com/ArpitMarkana/Healthcare-Chatbot"
            >
              <AiOutlineGithub size={20} />
              <span className={`${!open && "hidden"}`}>Github</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;