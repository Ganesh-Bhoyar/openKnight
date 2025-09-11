 

const Timer = (
  setFunc: React.Dispatch<React.SetStateAction<number>>,
  status: boolean,
  setTimeUp: React.Dispatch<React.SetStateAction<boolean>>,
    timerRef: { current: ReturnType<typeof setInterval> | null }
) => {
  if (status) {
    timerRef.current = setInterval(() => {
      setFunc((prev) => {
        if (prev <= 1) {
          setTimeUp(true);
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  } else {
    clearInterval(timerRef.current!);
  }
};
export default Timer;
