import { useNavigate } from "react-router-dom";

import { doLogout } from "./Auth";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    doLogout();

    navigate("/");
  }, []);
};
export default Logout;
