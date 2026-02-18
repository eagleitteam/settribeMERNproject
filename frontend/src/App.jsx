import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Meetings from "./pages/meetings/Meetings";
import Tasks from "./pages/tasks/Tasks";
import Mainpage from "./components/layout/Mainpage";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Route */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Protected Routes */}
        <Route 
            path="/" 
            element={
                    <ProtectedRoute>
                        <Mainpage />
                    </ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
