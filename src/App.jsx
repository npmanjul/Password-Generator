import { useState, useCallback, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";

function App() {
  const notify = () => {
    toast("Password is Copied");
  };
  const [length, setlength] = useState(6);
  const [number, setNumber] = useState(false);
  const [symbol, setSymbol] = useState(false);
  const [Password, setPassword] = useState("");

  const PasswordRef = useRef(null);

  const getPassword = useCallback(() => {
    let Pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "1234567890";
    if (symbol) str += "!@#$%^&*()+={}[]";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      Pass += str.charAt(char);
    }

    setPassword(Pass);
  }, [length, number, symbol, setPassword]);

  useEffect(() => getPassword(), [length, number, symbol, getPassword]);

  const copyPassword = useCallback(() => {
    // PasswordRef.current.select();
    // PasswordRef.current?.setSelectionRange(0, 9);
    notify();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-[100vh] bg-black text-white flex justify-center items-center flex-col">
        <div className="text-2xl md:text-5xl pb-[15px] font-bold">
          Password Generator
        </div>
        <div className="sm:w-[60%] w-[90%] h-auto p-9 bg-[rgba(173,181,192,0.16)] flex justify-center items-center flex-col rounded-[15px] gap-4 ">
          <div className="w-[100%] flex justify-center items-center gap-4 sm:flex-row flex-col">
            <div className="sm:w-[60%] w-[100%] bg-white h-[40px]  py-[8px] px-[14px] text-[16px] font-semibold  text-black rounded-[50px]">
              {Password}
            </div>

            <button
              className="w-[100px] bg-blue-700 h-[40px] rounded-[50px]"
              onClick={copyPassword}
            >
              Copy
            </button>
          </div>
          <div className="flex justify-center items-center flex-col sm:gap-7 gap-3 pt-[10px] text-yellow-500 font-semibold lg:flex-row">
            <label  className="flex justify-center items-center ">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                onChange={(e) => {
                  setlength(e.target.value);
                }}
                  className="mr-[10px] cursor-pointer"
              />
              length {length}
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked={Number}
                onChange={() => {
                  setNumber((prev) => !prev);
                }}
                className="mr-[5px] "
              />
              Add Number
            </label>

            <label>
              <input
                type="checkbox"
                defaultChecked={symbol}
                onChange={() => {
                  setSymbol((prev) => !prev);
                }}
                className="mr-[5px]"
              />
              Add Symbol
            </label>
          </div>
          <button
            className="bg-blue-700 pt-2.5 pb-2.5 pl-5 pr-5 font-semibold rounded-[50px]"
            onClick={getPassword}
          >
            Generator Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
