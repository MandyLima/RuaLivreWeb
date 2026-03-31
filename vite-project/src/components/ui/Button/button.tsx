import '../Button/button.css';

export function Button({className = "", ...props }) {
  return (
    <button
      className={`btn ${className}`}
      {...props}
    >
    </button>
  );
}