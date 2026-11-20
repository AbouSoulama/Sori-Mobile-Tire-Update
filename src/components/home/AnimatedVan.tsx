/** Illustrated service van. Animation is driven by CSS (see `.van-scene` in globals.css) once an ancestor has data-in="true". */
export function AnimatedVan({ className = "" }: { className?: string }) {
  const spokes = [0, 72, 144, 216, 288];

  const wheel = (cx: number) => (
    <g key={cx}>
      <circle cx={cx} cy={224} r={33} fill="#0b172a" />
      <g className="van-wheel">
        <circle cx={cx} cy={224} r={26} fill="#161b24" />
        <circle cx={cx} cy={224} r={17} fill="#d5dbe4" />
        {spokes.map((deg) => (
          <line
            key={deg}
            x1={cx}
            y1={224}
            x2={cx}
            y2={209}
            stroke="#8e99ab"
            strokeWidth={3}
            strokeLinecap="round"
            transform={`rotate(${deg} ${cx} 224)`}
          />
        ))}
        <circle cx={cx} cy={224} r={5} fill="#f7941d" />
      </g>
    </g>
  );

  return (
    <svg
      viewBox="0 0 520 300"
      role="img"
      aria-label="SORI Mobile Tire service van arriving at your location"
      className={`van-scene h-auto w-full ${className}`}
    >
      {/* Sky disc + sparkles */}
      <circle cx="262" cy="150" r="128" fill="#cfe7f3" />
      <circle cx="388" cy="56" r="16" fill="#fff" opacity=".9" />
      <circle cx="428" cy="92" r="6" fill="#9cc9de" />
      <circle cx="108" cy="82" r="9" fill="#fff" opacity=".8" />

      {/* Clouds */}
      <g className="van-cloud" opacity=".95">
        <ellipse cx="40" cy="60" rx="30" ry="11" fill="#fff" />
        <ellipse cx="62" cy="52" rx="20" ry="11" fill="#fff" />
      </g>
      <g className="van-cloud van-cloud-2" opacity=".8">
        <ellipse cx="10" cy="110" rx="26" ry="9" fill="#fff" />
        <ellipse cx="28" cy="103" rx="16" ry="9" fill="#fff" />
      </g>

      {/* Ground */}
      <ellipse cx="270" cy="254" rx="200" ry="9" fill="#0b172a" opacity=".14" />
      <line x1="20" y1="268" x2="500" y2="268" stroke="#0b172a" strokeOpacity=".18" strokeWidth="3" strokeDasharray="22 16" strokeLinecap="round" />

      {/* Location pin that drops in once the van has arrived */}
      <g className="van-pin">
        <g transform="translate(428 78)">
          <ellipse cx="0" cy="58" rx="10" ry="3.5" fill="#0b172a" opacity=".2" />
          <path d="M0 52C-14 34-20 24-20 14a20 20 0 0 1 40 0c0 10-6 20-20 38Z" fill="#f7941d" />
          <circle cx="0" cy="14" r="7.5" fill="#fff" />
        </g>
      </g>

      {/* Van */}
      <g className="van-drive">
        <g className="van-idle">
          {/* roof rack + beacon */}
          <path d="M120 103H300M135 103v7M285 103v7" stroke="#0b172a" strokeWidth="4" strokeLinecap="round" />
          <rect x="214" y="92" width="32" height="11" rx="5" fill="#f7941d" className="van-beacon" />

          {/* spare tire on rear door */}
          <circle cx="97" cy="168" r="27" fill="#161b24" />
          <circle cx="97" cy="168" r="13" fill="#9aa5b6" />
          <circle cx="97" cy="168" r="4" fill="#161b24" />

          {/* cargo body */}
          <rect x="104" y="112" width="230" height="110" rx="14" fill="#fff" stroke="#0b172a" strokeWidth="4" />
          <rect x="108" y="180" width="222" height="14" fill="#0b172a" />
          <rect x="108" y="196" width="222" height="6" fill="#f7941d" />
          <text x="219" y="150" textAnchor="middle" fontSize="19" fontWeight="800" fill="#0b172a" letterSpacing="1.5" style={{ fontFamily: "var(--font-display)" }}>
            SORI MOBILE TIRE
          </text>
          <text x="219" y="166" textAnchor="middle" fontSize="9" fontWeight="700" fill="#c06a05" letterSpacing="3.2">
            ROADSIDE ASSISTANCE
          </text>

          {/* cab */}
          <path d="M334 130H380Q398 130 410 150L438 190Q446 200 446 212V222H334Z" fill="#fff" stroke="#0b172a" strokeWidth="4" strokeLinejoin="round" />
          <path d="M346 142H376Q386 142 393 154L412 186H346Z" fill="#bfe3f2" stroke="#0b172a" strokeWidth="3" strokeLinejoin="round" />
          <path d="M352 150H372Q377 150 381 157" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".7" fill="none" />
          <rect x="334" y="180" width="112" height="14" fill="#0b172a" />
          <rect x="334" y="196" width="112" height="6" fill="#f7941d" />
          <rect x="437" y="198" width="9" height="12" rx="3" fill="#ffd36b" />
          <rect x="104" y="198" width="7" height="14" rx="2" fill="#e5484d" />
          <rect x="358" y="170" width="16" height="4" rx="2" fill="#0b172a" />

          {/* wheels */}
          {wheel(170)}
          {wheel(388)}
        </g>
      </g>
    </svg>
  );
}
