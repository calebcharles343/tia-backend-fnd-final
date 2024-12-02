import { useNavigate } from "react-router-dom";
import { logout } from "../services/apiAuth";
export default function Home() {
  const navigate = useNavigate();

  async function handleLogout() {
    const response = await logout();

    console.log(response);

    if (response.status === 200) navigate("/Auth");
  }
  return (
    <div>
      HOME <button onClick={handleLogout}>logout</button>
    </div>
  );
}
