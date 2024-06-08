import { FaHome } from "react-icons/fa";
const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 fixed h-full px-4 py-2">
      <div>
        <h1 className="text-2x text-white font-bold">Admin Dashboard</h1>
      </div>
      <hr />
      <ul className="mt-3 text-white font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <a href="" className="px-3">
            <FaHome className="inline-block w-6 h-6 mr-2 -mt--2"></FaHome>
            Home
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
