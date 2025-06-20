import { useEffect, useState, useRef } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import axios from "axios";


function App() {
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("seconds");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start or stop interval based on paused
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          const updated = prev + 1;
          localStorage.setItem("seconds", updated.toString());
          return updated;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  const handleReset = () => {
    setSeconds(0);
    localStorage.setItem("seconds", "0");
    setPaused(true);
  };
  const getReq = async () => {
    axios
      .get("https://api.example.com/users")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-6xl text-gray-700 mb-4">Timer</h1>
      {/* timer */}
      <div className="flex flex-col items-center justify-center bg-gray-300 px-6 py-5 rounded-4xl">
        <h1 className="text-7xl text-red-500">{seconds}s</h1>

        <div className="flex gap-6 mt-4">
          {paused ? (
            <button onClick={() => setPaused(false)} className="text-2xl">
              <Play />
            </button>
          ) : (
            <button onClick={() => setPaused(true)} className="text-2xl">
              <Pause />
            </button>
          )}
          <button onClick={handleReset} className="text-2xl">
            <RotateCcw />
          </button>
        </div>
      </div>

      <div>
        <button onClick={getReq}>Send Get req</button>
      </div>
    </div>
  );
}

export default App;
