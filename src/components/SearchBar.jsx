import { useState } from "react";
import names from "../assets/chordNames.json";
import "./css/search-bar.css";

export default function SearchBar({ onSelect }) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  function handleInputChange(event) {
    const input = event.target.value;

    if (input === "") {
      setResults([]);
      setInput("");
      return;
    }

    const filteredResults = [];
    let count = 0;

    names.chords.forEach((name) => {
      if (count < 5 && name.toLowerCase().startsWith(input.toLowerCase())) {
        filteredResults.push(name);
        count += 1;
      }
    });

    setInput(input);
    setResults(filteredResults)
  }

  function handleItemClick(item) {
    setInput(item);
    setResults([]);
    onSelect(item);
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(event) => handleInputChange(event)}
      />
      <ul>
        {results.map((item, index) => {
          return (
            <li key={index} onClickCapture={() => handleItemClick(item)}>
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
