import "./css/controls.css"

export default function Controls({ onLeft, onPlay, onRight }) {
  return (
    <div className="controls">
      <button onClick={() => onLeft()}>left</button>
      <button onClick={() => onPlay()}>+</button>
      <button onClick={() => onRight()}>right</button>
    </div>
  )
}