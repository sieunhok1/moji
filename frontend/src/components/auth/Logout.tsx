import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";
import { Button } from "../ui/button";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };
  return <Button onClick={handleLogOut}>đăng xuất</Button>;
};

export default Logout;
