import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <h1 className="relative text-2xl font-bold text-gray-100 group cursor-pointer">
          <span className="relative text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)]">
            Fresh
          </span>
          <span className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]">
            Track
          </span>
          <span className="absolute -bottom-1 left-0 w-1/2 h-1 bg-green-500 rounded-full group-hover:w-full transition-all duration-300"></span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
