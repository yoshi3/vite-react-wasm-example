import { useState, useEffect, useRef } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Increment = (value: number) => number;

function App() {
  const [count, setCount] = useState<number>(0);
  const wasmFunctions = useRef<{ increment?: Increment }>({});

  useEffect(() => {
    const loadWasm = async () => {
      try {
        const module = await WebAssembly.instantiateStreaming(fetch('/increment.wasm'));
        wasmFunctions.current = {
          increment: module.instance.exports.increment as Increment
        };
      } catch (error) {
        console.error('Error loading WebAssembly module:', error);
      }
    };

    loadWasm();
  }, []);

  const handleButtonClick = () => {
    const newCount = wasmFunctions.current.increment?.(count) ?? 0;
    setCount(newCount);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleButtonClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
