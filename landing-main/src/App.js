import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import SettingsPage from "./pages/SettingsPage";
import DonorsPage from "./pages/DonorsPage";
import RecipientsPage from "./pages/RecipientsPage";
import CalendarPage from "./pages/CalendarPage";
import TrackOrganPage from "./pages/TrackOrganPage";
import OrganManager from "./pages/addOrgan";
import OrganRecieverManager from "./pages/addReciver";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignupPage";
import DonorReceiverPage from "./pages/donorRecieverPage";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import LandingPage from "./pages/LandingPage"

function App() {
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/", "/donor-receiver", "/add-receiver", "/add-organ"];

  const shouldShowSidebar = !hideSidebarPaths.includes(location.pathname);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {shouldShowSidebar && <Sidebar />}

      <div className={`flex-1 overflow-auto ${shouldShowSidebar ? "" : "w-full"}`}>
        <Routes>
        {/* <Route path="/" element={<LandingPage/>} /> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<SignUp />}/>
          <Route path="/donor-receiver" element={<DonorReceiverPage />}/>
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/recipients" element={<RecipientsPage />} />
          <Route path="/track-organ" element={<TrackOrganPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/add-organ" element={<OrganManager />} />
          <Route path="/add-receiver" element={<OrganRecieverManager />} />
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;