import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import { Outlet } from "react-router-dom";
import AboutPage from "@/Pages/User/About/AboutPage";
import ContactPage from "@/Pages/User/Contact/ContactPage";
import ProgramsPage from "@/Pages/User/Programs/ProgramsPage";
import GalleryPage from "@/Pages/User/Gallery/GalleryPage";
import ResultsPage from "@/Pages/User/Results/ResultsPage";
import Error from "@/components/Common/Error";
import HomePage from "@/Pages/User/Home/HomePage";
import ZoneResultsPage from "@/Pages/User/ZoneResult/ZoneResultPage";
import ScrollToTop from "@/components/Common/ScrollTop";

const UserRouters = [
  {
    path: "/",
    element: (
      <>
        <Header />

        <div style={{ paddingTop: "60px" }}>
          {/* <div> */}
          <ScrollToTop />
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
        path: "/zoneresult",
        element: <ZoneResultsPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
];

export default UserRouters;
