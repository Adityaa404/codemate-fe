// components/ReadmeFormatter.js
import React from "react";

const ReadmeFormatter = ({ text }) => {
  const formatReadme = (text) => {
    const lines = text.split("\n");
    let formattedLines = [];

    lines.forEach((line, index) => {
      if (line.startsWith("* ")) {
        formattedLines.push(
          <h2 key={index} style={{ fontSize: "1.5em", fontWeight: "bold" }}>
            {line.slice(2).trim()}
          </h2>
        );
      } else if (line.startsWith("**###")) {
        formattedLines.push(
          <h3 key={index}>
            <strong>{line.slice(6).trim()}</strong>
          </h3>
        );
      } else if (/^\d+\./.test(line.trim())) {
        formattedLines.push(
          <li key={index} style={{ paddingLeft: "1em", listStyleType: "none" }}>
            {line.trim()}
          </li>
        );
      } else if (line.trim() === "") {
        formattedLines.push(<br key={index} />);
      } else if (line.startsWith("- ")) {
        formattedLines.push(
          <li key={index} style={{ paddingLeft: "1em", listStyleType: "disc" }}>
            {line.slice(2).trim()}
          </li>
        );
      } else {
        const formattedText = line.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );
        formattedLines.push(
          <p
            key={index}
            style={{ margin: "0.5em 0" }}
            dangerouslySetInnerHTML={{ __html: formattedText }}></p>
        );
      }
    });

    return formattedLines;
  };

  return <div>{formatReadme(text)}</div>;
};

export default ReadmeFormatter;
