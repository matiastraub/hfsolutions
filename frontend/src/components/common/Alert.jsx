import './Alert.css'

export const Alert = ({ type = 'info', message, onClose }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  )
}
