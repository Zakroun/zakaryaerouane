import MainPortfolio from "./main/MainPortfolio";
import SecondPortfolio from "./main/SecondPortfolio";
import ThirdPortfolio from "./main/ThirdPortfolio";
import { useEffect } from "react";
import { useRef } from "react";
function App() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  useEffect(() => {
    const handleMove = (e) => {
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + "px";
        cursorRingRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);
  return (
    <div className="App">
      {/* <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} /> */}
      <MainPortfolio />
    </div>
  );
}

export default App;
