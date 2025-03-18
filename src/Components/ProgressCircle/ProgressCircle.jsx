import s from "./ProgressCircle.module.css";

function ProgressCircle({ progress, pagesRead }) {
  const strokeWidth = 20;
  const radius = 95;
  const size = radius * 2 + strokeWidth;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * progress) / 100;

  return (
    <div className={s.container} style={{ width: size, height: size }}>
      <svg className={s.svg} width={size} height={size}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#444"
          strokeWidth={strokeWidth}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#30b94d"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </svg>

      <div className={s.innerCircle}>
        <span>100%</span>
      </div>

      <p className={s.progressWrapper}>
        <span className={s.progressIndicator}></span>
        {progress}%
      </p>

      <p className={s.pagesReadText}>{pagesRead} pages read</p>
    </div>
  );
}

export default ProgressCircle;
