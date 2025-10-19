export const Button = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
