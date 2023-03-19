
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { injectContext } from "./store/appContext";
import Home from "./pages/home";
import EntityDetails from "./component/entitydetails";
import Favorites from "./pages/favorites";
import Navbar from "./component/navbar.jsx";
import {Footer} from "./component/footer.jsx";

const Layout = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container flex-grow-1">
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/:entityType/:id" element={<EntityDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default injectContext(Layout);
