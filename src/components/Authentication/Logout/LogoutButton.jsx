import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { doLogout } from "@/modules/authentication";

const LogoutButton = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
    doLogout();
  };

  return (
    <Button color="info" onClick={handleClick}>
      <i className="fa fa-power-off me-2"></i>
      Logout
    </Button>
  );
};

export default LogoutButton;
