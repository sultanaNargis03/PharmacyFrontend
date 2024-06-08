import Navbar from "./Navbar";

const AdminHome = () => {
  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      <h3>Hello {user}! Welcome To PMA</h3>
    </div>
  );
};
export default AdminHome;
