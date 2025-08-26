
import Header from "../Components/Common/Header";
import Footer from "../Components/Common/Footer";
import HomePage from "../Pages/User/HomePage";
import { Outlet } from "react-router-dom";
import AboutPage from "../Pages/User/AboutPage";
import ContactPage from "../Pages/User/ContactPage";
import GalleryPage from "../Pages/User/GalleryPage";
import Error from "../Components/Common/Error";
import ResultsPage from "../Pages/User/ResultsPage";
import ProgramsPage from "../Pages/User/ProgramsPage";

const UserRouters = [
  {
    path: "/",
    element: (
      <>
        <Header />

        {/* <div style={{ paddingTop: "150px" }}> */}
        <div>
          <Outlet />
        </div>

        <Footer />
      </>
    ),

    children: [
      {
        path: "",
        element: <HomePage />,
      },
       {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/programs",
        element: <ProgramsPage />,
      },
       {
        path: "/gallery",
        element: <GalleryPage />,
      },
       {
        path: "/results",
        element: <ResultsPage />,
      },
      {
        path: "*",
        element : <Error/>
      }
    ],
  },
];

export default UserRouters;
