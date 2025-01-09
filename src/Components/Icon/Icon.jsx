function Icon({ name, size = 24, color = "currentColor", className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ fill: color }}
    >
      <use xlinkHref={`/icon/sprite.svg#${name}`} />
    </svg>
  );
}

export default Icon;
