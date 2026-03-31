import '../Label/label.css';

export function Label({ className = "",htmlFor = "",...props}) {
  return (
    <label
        htmlFor={htmlFor}
        className={`label-base ${className}`}
      {...props}
    />
  );
}