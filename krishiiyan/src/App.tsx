import "./App.css";
import SideNav from "./Components/layouts/SideNav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Sale from "./pages/pos/Sale";
import Inventory from "./pages/pos/Inventory";
import Report from "./pages/pos/Report";
import Purchase from "./pages/pos/Purchase";
import Accounting from "./pages/pos/Accounting";
import CropLibrary from "./pages/crop_advisary/CropLibrary";
import CropLibraryAdmin from "./pages/crop_advisory_admin/CropLiberaryAdmin";
import CropCalendar from "./pages/crop_advisary/CropCalendar";
import CropHealth from "./pages/crop_advisary/CropHealth";
import FertiCal from "./pages/crop_advisary/FertiCal";
import MandiPrices from "./pages/crop_advisary/MandiPrices";
import Dashboard from "./pages/farmer/Dashboard";
import Cultivation from "./pages/farmer/Cultivation";
import Credit from "./pages/farmer/Credit";
import Support from "./pages/farmer/Support";
import NewRegistration from "./pages/farmer/NewRegistration";
import Problem from "./pages/help/Problem";
import Expert from "./pages/help/Expert";
import Guide from "./pages/help/Guide";
import ManageAccounting from "./pages/management/Accounting";
import FPurchase from "./pages/farmer/Purchase";
import LoginPage from "./pages/Authentication/LoginPage";
import SignupPage from "./pages/Authentication/SignupPage";
import ForgotPassword from "./pages/Authentication/callForgotPAssword";
import ForgotPasswordLink from "./pages/Authentication/ForgotPassword";
import ProductBatches from "./pages/pos/ProductBatches";
import OTPVerification from "./pages/farmer/OTPVerification";
import { useEffect, useState } from "react";
import CropLibraryHandler from "./adminUserHandlers/CropLibraryHandler";
import CropCalenderHandler from "./adminUserHandlers/CropCalenderHandler";
import CropHealthHandler from "./adminUserHandlers/CropHealthHandler";
import SideNavHandler from "./adminUserHandlers/SideNavHandler";
import NewRegistrationHandler from "./adminUserHandlers/NewRegestration";
import AddCrop from "./pages/crop_advisory_admin/AddCrop";
import Premium from "./pages/crop_advisary/premium";
import MandiPricesHandler from "./adminUserHandlers/MandiPricesHandler";
import MandiPricesAdmin from "./pages/crop_advisory_admin/mandiPricesAdmin";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import OurTech from "./pages/OurTech";
import Who from "./pages/Who";
import Contact from "./pages/Contact";
import What from "./pages/What";
import Login from "./pages/Login";
import NewRegestrationAdmin from "./pages/crop_advisory_admin/NewRegestrationAdmin";
import NewRegistrationAdmin from "./pages/farmer/NewRegistrationAdmin";
import Announcement from "./pages/Announcement";
import Fponational from "./Components/Fponational";
import Fporegister from "./Components/Fporegister";
import PageSelector from "./pages/crop_advisary/ferticalselector";
import ShowData from "./Components/ShowData";

const AuthGuard = () => {
  const auth = localStorage.getItem("authToken");
  return auth ? <Outlet /> : <Navigate to="/home" />;
};

function App() {
  return (
    <div className="App font-roboto box-border m-0 p-0">
      <Routes>
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/FPOnational" element={<Fponational />} />
        <Route path="/fporegister" element={<Fporegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/tech" element={<OurTech />} />
        <Route path="/who" element={<Who />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/what" element={<What />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/FPOnational" element={<Fponational />} />
        <Route path="/fporegister" element={<Fporegister />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/Password-reset" element={<ForgotPasswordLink />} />
        <Route path="/showFPOData" element={<ShowData />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/" element={<AuthGuard />}>
          <Route
            path="/"
            element={
              <>
                <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                  <SideNavHandler />
                  {/*<Sale />*/}
                  <Sale />
                </main>
              </>
            }
          />
          <Route
            path="/inventory"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"pos"} submenu={"inventory"} />
                {/* <Inventory /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/product-batches"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"pos"} submenu={"product-batches"} />
                {/* <ProductBatches /> */}
                <ProductBatches />
              </main>
            }
          />
          <Route
            path="/report"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"pos"} submenu={"report"} />
                {/* <Report /> */}
                <NewRegestrationAdmin />
              </main>
            }
          />
          <Route
            path="/purchase"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"pos"} submenu={"purchase"} />
                {/* <Purchase /> */}
                <NewRegistrationAdmin />
              </main>
            }
          />
          <Route
            path="/accounting"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"pos"} submenu={"accounting"} />
                {/* <Accounting /> */}
                <Accounting />
              </main>
            }
          />
          <Route
            path="/crop_library"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"crop_library"} />
                {<CropLibraryHandler />}
              </main>
            }
          />
          <Route
            path="/add_crop"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"add_crop"} />
                {<AddCrop />}
              </main>
            }
          />
          <Route
            path="/crop_calendar"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"crop_calendar"} />
                <CropCalenderHandler />
              </main>
            }
          />
          <Route
            path="/crop_health"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"crop_health"} />
                <CropHealthHandler />
              </main>
            }
          />
          <Route
            path="/fertical"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"fertical"} />
                {/* <FertiCal /> */}
                <PageSelector />
              </main>
            }
          />
          <Route
            path="/mandi_prices"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"crop_advisory"} submenu={"mandi_prices"} />
                <MandiPricesHandler />
              </main>
            }
          />
          <Route
            path="/dashboard"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"dashboard"} />
                {/* <Dashboard /> */}
                <NewRegistrationAdmin />
              </main>
            }
          />
          <Route
            path="/farm_purchase"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"farm_purchase"} />
                {/* <FPurchase /> */}
                <NewRegestrationAdmin />
              </main>
            }
          />
          <Route
            path="/cultivation"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"cultivation"} />
                {/* <Cultivation /> */}
                <Cultivation />
              </main>
            }
          />
          <Route
            path="/credit"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"credit"} />
                {/* <Credit /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/support"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"support"} />
                {/* <Support /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/new_registration"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"frm"} submenu={"new_registration"} />
                <NewRegistrationHandler />
              </main>
            }
          />
          <Route
            path="/manage_accounting"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"management"} submenu={"manage_accounting"} />
                {/* <ManageAccounting /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/problem"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"help"} submenu={"problem"} />
                {/* <Problem /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/expert"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"help"} submenu={"expert"} />
                {/* <Expert /> */}
                <Premium />
              </main>
            }
          />
          <Route
            path="/guide"
            element={
              <main className="h-screen w-screen grid grid-cols-[18%_82%]">
                <SideNav menu={"help"} submenu={"guide"} />
                {/* <Guide /> */}
                <Premium />
              </main>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
