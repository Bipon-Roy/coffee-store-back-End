import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddCoffee from "./components/AddCoffee.jsx";
import UpdateCoffee from "./components/UpdateCoffee.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import Users from "./components/Users.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: () => fetch("https://coffee-store-server-tau-peach.vercel.app/coffee"),
    },
    {
        path: "/addCoffee",
        element: <AddCoffee />,
    },
    {
        path: "/updateCoffee/:id",
        element: <UpdateCoffee />,
        loader: ({ params }) =>
            fetch(`https://coffee-store-server-tau-peach.vercel.app/coffee/${params.id}`),
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/users",
        element: <Users />,
        loader: () => fetch("https://coffee-store-server-tau-peach.vercel.app/user"),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </AuthProvider>
);
