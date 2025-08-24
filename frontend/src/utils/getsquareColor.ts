export function getSquareColor({
  isPrevMove,
  isValidMove,
  isLight,
}: {
  isPrevMove: boolean;
  isValidMove: boolean;
  isLight: boolean;
}) {
  if (isPrevMove) return isLight ? " bg-yellow-300/90 " : " bg-yellow-300/75 ";
  if (isValidMove) return isLight ? " bg-emerald-300/95 " : " bg-emerald-300/60 ";
  return isLight ? " bg-zinc-300 " : " bg-zinc-500 ";
}
