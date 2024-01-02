import { useEffect, useRef, useState } from "react";
import "./App.css";
import { VncScreen } from "react-vnc";

function App() {
  const ref = useRef();
  const [hmiURL, setHmURL] = useState("");

  useEffect(() => {
    const getIP = (e: MessageEvent<string>) => {
      console.log(e.data);
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
          color: "#FFFFFF99",
          fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        }}
      >
        <p>Waiting for HMI to connect...</p>
      </div>
    );

  return (
    <VncScreen
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
