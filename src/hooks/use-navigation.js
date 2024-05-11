import { useContext } from "react";
import NavigationContext from "../context/navigation";
function useNavigatoin() {
  return useContext(NavigationContext);
}
export default useNavigatoin;
