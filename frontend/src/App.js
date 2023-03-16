import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/admin/Profile";
import ReqTable from "./components/admin/ReqTable";
import StudentTable from "./components/admin/StudentTable";
import BaseLayout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import StudentRoute from "./components/student/StudentRoute";
import AdminRoute from "./components/admin/AdminRoute";
import AdminHome from "./components/admin/AdminHome";
import ChangePw from "./components/ChangePw";
import PredictionForm from "./components/student/PredictionForm";
import StudentHome from "./components/student/StudentHome";

function App() {
  const { authed, loading } = useAuth();

  return (
    <div className="App">
      {loading ? (
        <div> Loading... </div>
      ) : (
        <>
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/" exact element={authed?.admin ? <Navigate to="/admin" /> : <Navigate to="/student" />} />
            <Route path="/student" exact element={<StudentRoute component={StudentHome} />} />
            <Route path="/student/predictionForm" exact element={<StudentRoute component={PredictionForm} />} />
            <Route path="/student/settings" exact element={<StudentRoute component={ChangePw} />} />

            <Route path="/admin" exact element={<AdminRoute component={AdminHome} />} />
            <Route path="/admin/regitrationReq" exact element={<AdminRoute component={ReqTable} />} />
            <Route path="/admin/students" exact element={<AdminRoute component={StudentTable} />} />
            <Route path="/admin/profile" exact element={<AdminRoute component={Profile} />} />
            <Route path="/admin/settings" exact element={<AdminRoute component={ChangePw} />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
