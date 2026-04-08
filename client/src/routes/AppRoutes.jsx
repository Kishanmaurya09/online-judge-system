import { Routes, Route } from "react-router-dom"

import Dashboard from "../pages/Dashboard"
import Problems from "../pages/Problems"
import ProblemDetail from "../pages/ProblemDetail"
import SolveProblem from "../pages/SolveProblem"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import Leaderboard from "../pages/Leaderboard"
import MySubmissions from "../pages/MySubmissions"
import ContestDetails from "../pages/ContestDetails"
import AdminPanel from "../pages/admin/AdminPanel"
import CreateProblem from "../pages/admin/CreateProblem"
import EditProblem from "../pages/admin/EditProblem"
import ManageProblems from "../pages/admin/ManageProblems"
import Contests from "../pages/Contests"
import ProtectedRoute from "../components/ProtectedRoute"
import Layout from "../components/Layout"
import CreateContest from "../pages/admin/CreateContest"
import ContestLeaderboard from "../pages/ContestLeaderboard";
import Profile from "../pages/Profile"


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />


            <Route element={<Layout />}>

                <Route path="/dashboard" element={
                    <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />

                <Route path="/problems" element={
                    <ProtectedRoute><Problems /></ProtectedRoute>
                } />

                <Route path="/problems/:id" element={
                    <ProtectedRoute><ProblemDetail /></ProtectedRoute>
                } />

                <Route path="/solve/:id" element={
                    <ProtectedRoute><SolveProblem /></ProtectedRoute>
                } />

                <Route path="/leaderboard" element={<Leaderboard />} />

                <Route path="/my-submissions" element={
                    <ProtectedRoute><MySubmissions /></ProtectedRoute>
                } />
                <Route path="/contests" element={<Contests />} />
                <Route
                    path="/contests/:id"
                    element={
                        <ProtectedRoute>
                            <ContestDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contest/:id/leaderboard"
                    element={<ContestLeaderboard />}
                />

                <Route path="/admin/create-contest" element={<CreateContest />} />

            </Route>

            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/create-problem" element={<CreateProblem />} />
            <Route path="/admin/edit-problem/:id" element={<EditProblem />} />
            <Route path="/admin/problems" element={<ManageProblems />} />

        </Routes>
    )
}

export default AppRoutes