

const Logout = () => {
  return (
    <div
      className="bg-red-500 py-1.5 px-4 rounded-lg text-md text-white hover:bg-red-600 duration-200 cursor-pointer"
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}
    >
      Logout
    </div>
  );
};

export default Logout;
