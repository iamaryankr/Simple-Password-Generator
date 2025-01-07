import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // useState hooks
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 105);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  // Increment and decrement functions
  const incrementLength = () => {
    setLength((prevLength) => Math.min(prevLength + 1, 100)); // Max length 100
  };

  const decrementLength = () => {
    setLength((prevLength) => Math.max(prevLength - 1, 6)); // Min length 6
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 active:scale-95 transition-transform"
        >
          Copy
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={decrementLength}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 active:scale-95"
        >
          -
        </button>
        <span className="text-white text-sm">Length: {length}</span>
        <button
          onClick={incrementLength}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 active:scale-95"
        >
          +
        </button>
      </div>
      <div className="flex text-sm gap-x-4 items-center mb-4">
        <input
          type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer w-full"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
