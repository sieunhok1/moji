import { toast } from "sonner";
import Logout from "../components/auth/Logout";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../stores/useAuthStore";
import api from "../lib/axios";

const ChatAppPage = () => {
  const user = useAuthStore((s) => s.user);

  const handleOnClick = async () => {
    try {
      await api.get("/users/test", { withCredentials: true });
      toast.success("ok");
    } catch (error) {
      toast.error("Loi");
    }
  };
  return (
    <div>
      {user?.username}
      <Logout />
      <Button onClick={handleOnClick}>Click</Button>
    </div>
  );
};

export default ChatAppPage;
