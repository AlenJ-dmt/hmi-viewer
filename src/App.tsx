import { useEffect, useRef, useState } from "react";
import "./App.css";
import { VncScreen } from "react-vnc";

function App() {
  const ref = useRef();
  const [hmiURL, setHmURL] = useState("");

  useEffect(() => {
    const getIP = (e: MessageEvent<string>) => {
      setHmURL(e.data);
    };

    window.addEventListener("message", getIP);
    return () => {
      window.removeEventListener("message", getIP);
    };
  }, [ref]);

  if (!hmiURL)
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p>Waiting for HMI to connect...</p>
      </div>
    );

  return (
    <VncScreen
      // url={`ws://127.0.0.1:6080/vnc.html?host=127.0.0.1&port=6080&ip=${hmiIp}`}
      url={hmiURL}
      scaleViewport
      background="#000000"
      style={{
        width: "100vw",
        height: "100vh",
      }}
      ref={ref}
    />
  );
}

export default App;
