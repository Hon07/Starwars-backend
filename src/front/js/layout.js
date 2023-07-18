import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext";
import Home from "./pages/home";
import { PlanetDetails } from "./pages/planetDetails.js";
import { VehicleDetails } from "./pages/vehicleDetails";
import Navbar from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import People from "./pages/people";
import Vehicles from "./pages/vehicles";
import Planets from "./pages/planets";
import EntityDetailsRoute from "./pages/entitydetailsRoute";
import { PeopleDetail } from "./pages/peopleDetails";
import People1 from "./pages/people1";

const Layout = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route index path="/" element={<Home />} />

            <Route path="/people" element={<People />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/details" element={<EntityDetailsRoute />} />
            <Route path="/planets/:planetid" element={<PlanetDetails />} />
            <Route path="/characters/:characterid" element={<PeopleDetail />} />
            <Route path="/vehicles/:vehicleid" element={<VehicleDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
