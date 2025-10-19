export const RenderStars = ({ rate }) => {
  const stars = []
  const roundedRate = Math.round(rate) // round to nearest full star
  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRate) {
      stars.push(
        <span
          key={i}
          className='text-yellow-400'
        >
          ★
        </span>
      )
    } else {
      stars.push(
        <span
          key={i}
          className='text-gray-300'
        >
          ★
        </span>
      )
    }
  }
  return stars
}
