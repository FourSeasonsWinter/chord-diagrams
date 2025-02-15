export default function ChordDiagram({
  name,
  frets,
  barres,
  startingFret = 1,
}) {
  // Dimensions and Spacing
  const svgWidth = 120;
  const svgHeight = 180;
  const numFrets = 4;
  const numStrings = 6;

  const stringSpacing = svgWidth / (numStrings - 1) - 2;
  const fretSpacing = (svgHeight - 20) / (numFrets + 1);

  const color = "#ffffff";

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      aria-label={`${name} chord diagram`}
    >
      {/* Chord name */}
      <text
        x="50%"
        y="12"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
        fill={color}
      >
        {name}
      </text>

      {/* Strings */}
      {[...Array(numStrings)].map((_, i) => {
        let x = i * stringSpacing + 5;

        return (
          <line
            key={`string-${i}`}
            x1={x}
            y1={40}
            x2={x}
            y2={svgHeight - 12}
            stroke={color}
            strokeWidth="1"
          />
        );
      })}

      {/* Frets */}
      {[...Array(numFrets + 1)].map((_, i) => {
        return (
          <line
            key={`fret-${i}`}
            x1="5"
            y1={i * fretSpacing + 40}
            x2={svgWidth - 5}
            y2={i * fretSpacing + 40}
            stroke={color}
            strokeWidth={i === 0 && startingFret === 1 ? 3 : 1}
          />
        );
      })}

      {/* Starting Fret Number */}
      {startingFret > 1 && (
        <text
          x={-8}
          y={44 + fretSpacing / 2}
          fontSize="12"
          textAnchor="end"
          fill={color}
        >
          {startingFret}
        </text>
      )}

      {/* Open and Muted Strings */}
      {frets.map((fret, i) => {
        let x = i * stringSpacing + 5;

        if (fret === 0) {
          return (
            <text
              key={`open-${i}`}
              x={x}
              y={34}
              fontSize={14}
              textAnchor="middle"
              fill={color}
            >
              O
            </text>
          );
        }
        if (fret === -1) {
          return (
            <text
              key={`mute-${i}`}
              x={x}
              y={34}
              fontSize={14}
              textAnchor="middle"
              fill={color}
            >
              X
            </text>
          );
        }
        return null;
      })}

      {/* Dots */}
      {frets.map((fret, i) => {
        if (
          fret > 0 &&
          (!barres ||
            !barres.some(
              (barre) =>
                barre.fret === fret &&
                i + 1 >= barre.fromString &&
                i + 1 <= barre.toString
            ))
        ) {
          const x = i * stringSpacing + 5;
          const y = fret * fretSpacing + 40;

          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={(y - fretSpacing / 2).toString()}
              r="8"
              fill={color}
            />
          );
        }
      })}

      {/* Barres */}
      {barres &&
        barres.map((barre, index) => {
          const { fret, fromString, toString } = barre;
          const xStart = (fromString - 1) * stringSpacing + 5;
          const xEnd = (toString - 1) * stringSpacing + 5;
          const y =
            (fret - startingFret + 1) * fretSpacing + 30 - fretSpacing / 2;

          return (
            <rect
              key={`barre-${index}`}
              x={xStart - 4}
              y={y}
              width={xEnd - xStart + 8}
              height="16"
              rx="8"
              ry="8"
              fill={color}
            />
          );
        })}
    </svg>
  );
}
