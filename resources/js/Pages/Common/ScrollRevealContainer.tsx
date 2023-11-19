import { FC, useRef, useEffect } from "react";
import scrollReveal from "scrollreveal";

interface ScrollRevealContainerProps {
  move?: string;
}

const ScrollRevealContainer: FC<ScrollRevealContainerProps> = ({ className, children, move }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current)
      scrollReveal().reveal(sectionRef.current, {
        // reset: true,
        delay: 200,
        distance: "60px",
        // interval: 100,
        reset: false,
        duration: 1500,
        opacity: 0,
        origin:
          move === "left" ? "left" : move === "right" ? "right" : move === "top" ? "top" : "bottom",
        // distance: "40px",
      });
  }, [sectionRef]);

  return (
    <section className={`${className}`} ref={sectionRef}>
      {children}
    </section>
  );
};
export default ScrollRevealContainer;
