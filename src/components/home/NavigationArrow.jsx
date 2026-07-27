export default function NavigationArrow({ direction = "right", color = "inherit" }) {
  const isLeft = direction === "left";
  
  return (
    <svg 
      viewBox="0 0 52.01 27.9" 
      className="w-6 h-6 md:w-7 md:h-7"
      style={{ transform: isLeft ? "rotate(180deg)" : "none", color }}
    >
      <path 
        d="M.75,13.95h49" 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="square" 
        strokeWidth="1"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path 
        d="M37.83,1.06l13.1,12.89-13.1,12.89" 
        fill="none" 
        stroke="currentColor" 
        strokeLinecap="square" 
        strokeWidth="1"
        strokeMiterlimit="10"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}