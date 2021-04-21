export const convertMillisToMinutes = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));

  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutesString}:${secondsString}`;
};

export const calculateProgress = (
  time: number,
  overallTime: number,
  defaultProgressValue = 100,
) => {
  return Math.abs(
    (time * defaultProgressValue) / overallTime - defaultProgressValue,
  ).toFixed(2);
};
