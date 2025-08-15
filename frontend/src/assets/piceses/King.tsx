// King.jsx
 

const King = ({ size = 45, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45 45"
    width={size}
    height={size}
    className={className}
  >
    <g
      fill="currentColor"
      fillOpacity="0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    >
      <path d="M22.5 11.63V6M20 8h5" strokeLinecap="round" />
      <path
        d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5"
        fill="currentColor"
        fillRule="evenodd"
        stroke="#000"
        strokeOpacity="0.3"
      />
      <path
        d="M12.5 37c5.5-3 5.5-3 10-3s10 3 10 3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M12.5 37c5.5-3 5.5-3 10-3s10 3 10 3l-2.5 4.5h-15l-2.5-4.5z"
        fill="currentColor"
        strokeLinecap="round"
        stroke="#000"
        strokeOpacity="0.3"
      />
      <path d="M12.5 37a10 10 0 0 1 20 0" fill="none" stroke="currentColor" />
    </g>
  </svg>
);

export default King;