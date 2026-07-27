export default function FooterLogo() {

  return (
    <div className="w-full px-6 md:px-[8vw] py-8 md:pt-16 md:pb-8">
      <svg
        viewBox="0 0 1000 110"
        preserveAspectRatio="xMidYMid meet"
        className="w-full block overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="500"
          y="90"
          textAnchor="middle"
          fontFamily="var(--font-heading)"
          fontWeight="700"
          fontSize="110"
          textLength="980"
          lengthAdjust="spacing"
          fill="currentColor"
        >
          ALEXIA
        </text>
      </svg>
    </div>
  );
}