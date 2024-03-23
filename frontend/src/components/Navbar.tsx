import { Link } from "react-router-dom";
import { LogoutFormProps } from "../../types";
import { Link as ScrollLink } from "react-scroll";

const Navbar = ({ onLogout, user }: LogoutFormProps) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 h-[10vh] bg-red-600 flex justify-between items-center opacity-100">
      <h1 className="text-[34px] dela-font text-blue-400 bg-white ml-5 px-5 py-3 rounded-md">
        Betting <span className="text-red-600 dela-font">Service</span>
      </h1>
      <div className="flex justify-center items-center text-center gap-4 text-white font-bold">
        <Link
          to={"/admin"}
          className="hover:underline underline-offset-4 transition-all ease-in-out duration-300 cursor-pointer"
        >
          ADMIN PANEL
        </Link>
        <ScrollLink
          to="leaderboard"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:underline underline-offset-4 transition-all ease-in-out duration-300 cursor-pointer"
        >
          LEADERBOARD
        </ScrollLink>
        <ScrollLink
          to="betSection"
          spy={true}
          smooth={true}
          duration={500}
          className="hover:underline underline-offset-4 transition-all ease-in-out duration-300 cursor-pointer"
        >
          BETS SECTION
        </ScrollLink>
      </div>
      <div className="flex mr-5 items-center gap-2">
        <div className="text-white text-[15px] font-semibold mr-5 cursor-default">
          {user.toUpperCase()}
        </div>
        <button
          onClick={onLogout}
          className=" text-black bg-white rounded-lg py-1 px-5 text-sm hover:bg-transparent hover:text-white transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
