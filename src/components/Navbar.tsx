import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="bg-blue-500 px-14 py-4 flex items-center justify-between mb-5">
      <Link to="/" className="text-white text-3xl font-bold">
        NewsPortal
      </Link>
      <form className="bg-white rounded-xl px-3 py-1">
        <input
          type="text"
          placeholder="Search"
          className="border-none outline-none"
        />
      </form>
    </div>
  );
};

export default Navbar;
