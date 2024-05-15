import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./page/auth/login";
import Loader from "./utils/Loader";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./page/dashboard/Dashboard";
import { HistoryTable } from "./page/history/history";
import { QuikRechargeCard } from "./component/card/QuikRechargeCard";
import { ChangePassword } from "./page/profile/profile";
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route path="/auth/sign-in" element={<Login />} />
        <Route path="/history" element={<HistoryTable />} />
        <Route path="/quik-recharge" element={<QuikRechargeCard />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default App;
