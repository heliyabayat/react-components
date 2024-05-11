import { cleanup } from "@testing-library/react";
import { createContext, useState, useEffect } from "react";

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  //this is all about when a user click on back or forward button on browser,we do not want whole refresh
  //we just want rerender when we navigate between the address .if we make address bt pushState fun other fun is made in
  //back and forward button and it helps us of happening whole refresh.but we need a func that changes the address bar when
  //we click on back and forward button.
  useEffect(() => {
    const handler = () => {
      setCurrentPath(!currentPath);
    };
    //when we click on back and forward button (the popstate) we call handler to update the state(set new address)
    //BUT we need to clean the pervious address which we were at,so we use clean up fun to do it
    window.addEventListener("popstate", handler);
    //cleanUp fun
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  };
  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};
export { NavigationProvider };
export default NavigationContext;
