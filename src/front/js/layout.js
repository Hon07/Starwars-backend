import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { injectContext } from "./store/appContext";
import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Navbar from "./component/navbar.jsx";
import { Footer } from "./component/footer.jsx";
import People from "./pages/people";
import Vehicles from "./pages/vehicles";
import Planets from "./pages/planets";
import EntityDetailsRoute from "./pages/entitydetailsRoute";
import CharacterDetails from "./pages/characterDetails";
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
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/people" element={<People />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/planets" element={<Planets />} />
            <Route path="/details" element={<EntityDetailsRoute />} />
            <Route path="/character-details/:id" element={<CharacterDetails />} />
            <Route path="/people1" element={<People1 />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
