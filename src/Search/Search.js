import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";

const Search = () => {
  const [input, setInput] = useState(0);
  const [results, setResults] = useState(0);

  const onChange = e => {
    setInput(e.target.value);
  };

  const getHighlightedText = (text, highlight) => {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index}>{part}</span>
      ) : (
        part
      )
    );
  };

  useEffect(() => {
    if (input.length >= 3) {
      axios
        .get(
          "https://gist.githubusercontent.com/abhijit-paul-blippar/0f97bb6626cfa9d8989c7199f7c66c5b/raw/dcff66021fba04ee8d3c6b23a3247fb5d56ae3e5/words"
        )
        .then(response => {
          if (response.status == 200) {
            var searchReturns = response.data
              .split("\n")
              .filter(function(value) {
                return value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
              });
            setResults(searchReturns);
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      setResults([]);
    }
  }, [input]);

  return (
    <div>
      <div className="searchbox">
        <h3 className="devname">
          Khadar Navaz Khan A <br />
          <span>khadarkhan.it@gmail.com</span>
        </h3>
        <input type="text" placeholder="Enter Search..." onChange={onChange} />
      </div>
      <div className="results">
        {input ? (
          <p>
            <strong>{results.length > 0 ? results.length : ""}</strong> Matches
            found for <strong>{input}</strong>
          </p>
        ) : (
          ""
        )}
        <div>
          <ul>
            {results.length > 0
              ? results.map((result, index) => (
                  <li key={index}>{getHighlightedText(result, input)}</li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
