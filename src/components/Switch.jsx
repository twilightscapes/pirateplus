import React, { useState, useEffect } from "react";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { PiHandSwipeRightFill } from "react-icons/pi";
import useSiteMetadata from "../hooks/SiteMetadata";

function Header() {
  const { language } = useSiteMetadata();
  const { dicSwipe, dicScroll } = language;

  const [isSliderVisible, setIsSliderVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem("isSliderVisible");
      try {
        return JSON.parse(storedValue) ?? true;
      } catch (error) {
        return true;
      }
    }
    return true;
  });

  const toggleSlider = () => {
    setIsSliderVisible((prev) => {
      const newValue = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem("isSliderVisible", JSON.stringify(newValue));
        // Broadcast the change to other tabs/windows
        window.dispatchEvent(new StorageEvent("storage", { key: "isSliderVisible" }));
      }
      return newValue;
    });
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isSliderVisible" && typeof window !== 'undefined') {
        const storedValue = localStorage.getItem("isSliderVisible");
        setIsSliderVisible(JSON.parse(storedValue));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  useEffect(() => {
    const saveToLocalStorage = () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem("isSliderVisible", JSON.stringify(isSliderVisible));
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("beforeunload", saveToLocalStorage);

      return () => {
        window.removeEventListener("beforeunload", saveToLocalStorage);
      };
    }
  }, [isSliderVisible]);

  return (
    <div>
      <button
        aria-label="Toggle View"
        onClick={() => {
          toggleSlider();
        }}
        className="swipescroll"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "0px",
          textAlign: "center",
          width: "100%"
        }}
      >
        {isSliderVisible ? (
          <div className="themer"><BsFillGrid3X2GapFill style={{ width: '36px', height: '30px' }} /></div>
        ) : (
          <div className="themer"><PiHandSwipeRightFill style={{ width: '36px', height: '30px' }} /></div>
        )}
        <span className="themetext" style={{ fontSize: '' }}>
          {isSliderVisible ? dicScroll : dicSwipe}
        </span>
      </button>
    </div>
  );
}

export default Header;
