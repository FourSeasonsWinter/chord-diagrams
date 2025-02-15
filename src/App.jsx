import { useState } from "react";
import Carousel from "./components/Carousel";
import Controls from "./components/Controls";
import "./App.css"

function App() {
  const [activeSlide, setActiveSlide] = useState(0);

  const CMajorChord = {
    name: "C Major",
    frets: [-1, 3, 2, 0, 1, 0],
    barres: [],
  };

  const FMajorChord = {
    name: "F Major",
    frets: [1, 3, 3, 2, 1, 1],
    barres: [{ fret: 1, fromString: 1, toString: 6 }],
  };

  const diagrams = [
    CMajorChord,
    FMajorChord,
    CMajorChord,
    FMajorChord,
    CMajorChord,
    FMajorChord,
  ];

  function handleLeft() {
    if (activeSlide === 0)
      return;

    setActiveSlide(activeSlide - 1)
  }

  function handleRight() {
    if (activeSlide === diagrams.length - 1)
      return;

    setActiveSlide(activeSlide + 1)
  }

  return (
    <>
      <h1>Chords</h1>
      <Carousel diagrams={diagrams} activeSlide={activeSlide} onDiagramClick={(index) => setActiveSlide(index)} />
      <Controls onLeft={handleLeft} onPlay={() => {}} onRight={handleRight} />
    </>
  );
}

export default App;
