import { useState } from "react";
import Carousel from "./components/Carousel";
import guitarChords from "./assets/guitar.json";
import "./App.css";
import { useEffect } from "react";
import SearchBar from "./components/SearchBar";

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

function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [diagrams, setDiagrams] = useState([]);

  function loadChords(key, suffix = "dim") {
    const diagrams = [];
    const suffixes = guitarChords.suffixes;
    const positions =
      guitarChords.chords[`${key}`][suffixes.indexOf(suffix)].positions;

    for (let i = 0; i < positions.length; ++i) {
      const chord = positions[i];

      // Modify the data from the json
      if (chord.barres.length != 0) {
        const value = chord.barres[0];
        const from = chord.frets.indexOf(value) + 1;
        const to = chord.frets.lastIndexOf(value) + 1;

        const newChord = {
          name: "",
          frets: chord.frets,
          baseFret: chord.baseFret,
          barres: [{ fret: value, fromString: from, toString: to }],
        };

        diagrams.push(newChord);
        continue;
      }

      diagrams.push(chord);
    }

    setActiveSlide(0);
    setDiagrams(diagrams);
  }

  function onSelect(chordName) {
    let key;
    let suffix;

    const number = chordName[1] === "#" || chordName[1] === "b" ? 2 : 1;

    key = chordName.substring(0, number).trim();
    suffix = chordName.substring(number).trim();

    // Change # to sharp
    // TODO update the guitar.json data
    if (key.length === 2 && key[1] === '#')
      key = key[0] + 'sharp'

    loadChords(key, suffix);
  }

  useEffect(() => {
    loadChords("C");
  }, []);

  return (
    <>
      <div className="search-bar">
        <SearchBar onSelect={(item) => onSelect(item)} />
      </div>
      <Carousel
        diagrams={diagrams}
        activeSlide={activeSlide}
        onDiagramClick={(index) => setActiveSlide(index)}
      />
    </>
  );
}

export default App;
