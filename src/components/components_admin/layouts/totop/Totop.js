import React, { useEffect, useState } from "react";

function Totop(props) {
  const [top, setTop] = useState(false);
  useEffect(() => {
    const callback1 = () => {
      setTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", callback1);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", callback1);
    };
  }, []);
  const toTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <React.Fragment>
      {top && (
        <button className="scroll-to-top rounded" onClick={toTop}>
          <i className="fas fa-angle-up" />
        </button>
      )}
    </React.Fragment>
  );
}

export default Totop;
