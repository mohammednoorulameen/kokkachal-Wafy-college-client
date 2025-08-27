import Error from "@/Components/Common/Error";
import AdminDashboard from "@/Pages/admin/adminHomePage/AdminHomePage";


const AdminRouters = [
  {
    
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
     
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default AdminRouters;
