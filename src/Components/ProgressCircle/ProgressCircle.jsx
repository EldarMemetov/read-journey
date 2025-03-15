import s from "./ProgressCircle.module.css";

function ProgressCircle({ progress, pagesRead }) {
  const size = 220;
  const radius = 80;
  const strokeWidth = 15;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * progress) / 100;

  return (
    <div className={s.container}>
      <svg className={s.svg} width={size} height={size}>
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#1f1f1f"
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

      <p className={s.progressText}>{progress}%</p>
      <p className={s.pagesReadText}>{pagesRead} pages read</p>
    </div>
  );
}

export default ProgressCircle;
