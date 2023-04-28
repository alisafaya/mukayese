import { useLocation } from "react-router-dom";

const useQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};

export default useQuery;
