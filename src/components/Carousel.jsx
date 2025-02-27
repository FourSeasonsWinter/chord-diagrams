import { useEffect, useRef } from "react";
import ChordDiagram from "./ChordDiagram";
import "./css/carousel.css";

export default function Carousel({ diagrams, activeSlide, onDiagramClick }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    if (itemRefs.current[activeSlide]) {
      itemRefs.current[activeSlide].scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activeSlide]);

  return (
    <div className="carousel-container">
      {diagrams.map((diagram, index) => {
        return (
          <div
            key={index}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`carousel-item ${index === activeSlide ? "active" : ""}`}
            onClick={() => onDiagramClick(index)}
          >
            <ChordDiagram {...diagram} />
          </div>
        );
      })}
    </div>
  );
}
