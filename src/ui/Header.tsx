import { authStore } from "../store/authStore";
import outline from "../data/img/passportDPnew.webp";
import { HiSearch } from "react-icons/hi";

export default function Header() {
  const { user } = authStore();
  const userActive = user?.user;

  return (
    <header className="flex items-center justify-between col-start-2 col-end-3 c w-full h-full  bg-[#FFA82B] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[20px] border border-[rgba(255, 155, 0, 0.57)] rounded-lg p-4">
      <form>
        <div className="w-[55vw] flex items-center gap-2">
          <button>
            <HiSearch />
          </button>

          <input
            className="px-4 w-full h-8 mr-8 rounded-full focus:border-[#B97743] focus:outline-none "
            type="text"
            placeholder="search"
          />
        </div>
      </form>

      <div className="min-w-48 flex items-center gap-4">
        <img
          className="w-12 h-12 rounded-full"
          src={outline}
          alt="passport outline"
        />
        <span>{userActive?.name}</span>
      </div>
    </header>
  );
}
