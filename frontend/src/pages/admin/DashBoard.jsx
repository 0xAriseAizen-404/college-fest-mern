import { useSelector } from "react-redux";

export const DashBoard = () => {
  const { currentAdmin } = useSelector((state) => state.admin);
  console.log(currentAdmin);
  return <div>DashBoard</div>;
};
