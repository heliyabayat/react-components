import classNames from "classnames";
import useNavigation from "../hooks/use-navigation";

export default function Link({ to, children, className, activeClassName }) {
  const { navigate, currentPath } = useNavigation();
  const classes = classNames(
    "text-blue-500",
    className,
    currentPath === to && activeClassName
  );
  const handleClick = (event) => {
    //add for be openable in new tab bu pressing ctrl button but it does not work???
    if (event.metaKey || event.ctrKey) {
      return;
    }
    event.preventDefault();

    navigate(to);
  };
  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}
