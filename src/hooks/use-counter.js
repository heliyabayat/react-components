import { useEffect, useState } from "react";

function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    console.log(count);
  }, [count]);
  //change name from handleClick into increment
  const increment = () => {
    setCount(count + 1);
  };

  return {
    count,
    increment,
  };
}
export default useCounter;
