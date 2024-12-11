import { Link } from "react-router-dom";
// import { logout } from "../services/apiAuth";
import { useLogout } from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import sideBarImg2 from "../data/img/SIdeBar-2.jpg";

export default function Sidebar() {
  const { logout, isPending } = useLogout();
  async function handleLogout() {
    logout();
  }
  return (
    <nav
      className="flex flex-col bg-red-500 items-center row-start-1 row-end-3 w-full h-full p-4 shadow-xl gap-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${sideBarImg2})` }}
    >
      <span
        className="Protest+Revolution text-[16px] text-[#ffa82b] font-extrabold p-2 border border-[#ffa82b] rounded-lg"
        style={{ fontFamily: "Syncopate" }}
      >
        {/* Protest Revolution */}
        Shopping List
      </span>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="Home">Home</Link>
        </li>

        <li>
          <Link to="cart">Cart</Link>
        </li>
      </ul>

      {isPending ? (
        <SpinnerMini />
      ) : (
        <button onClick={handleLogout}> logout</button>
      )}
    </nav>
  );
}
