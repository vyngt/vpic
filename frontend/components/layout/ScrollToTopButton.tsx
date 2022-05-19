import { useState, useEffect } from "react";

export const ScrollToTopButton = () => {
  const [visible, set_visible] = useState<boolean>(false);

  const scroll_to_top = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(function mount() {
    const toggle_visible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        set_visible(true);
      } else if (scrolled <= 300) {
        set_visible(false);
      }
    };

    window.addEventListener("scroll", toggle_visible);

    return function unMount() {
      window.removeEventListener("scroll", toggle_visible);
    };
  });

  return (
    <button
      onClick={scroll_to_top}
      style={{ display: visible ? "inline" : "none" }}
      className="btn scroll-to-top"
    >
      <span>Up</span>
    </button>
  );
};
