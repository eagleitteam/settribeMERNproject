import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/dashboard/Dashboard";

import Tasks from "./pages/tasks/Tasks";
import Mainpage from "./components/layout/Mainpage";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Users from "./pages/users/Users";
import Meetings from "./pages/meetings/Meetings";

function App() {
  return (
    <BrowserRouter>

      {/* 🔔 Toast Global */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Mainpage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="Meetings" element={<Meetings />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="adduser" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
