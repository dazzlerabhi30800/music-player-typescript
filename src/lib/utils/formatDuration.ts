export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const remainingTime = Math.floor(duration % 60);
  const seconds = remainingTime < 10 ? `0${remainingTime}` : remainingTime;
  return `${minutes}:${seconds}`;
};
