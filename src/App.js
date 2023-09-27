import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./context/AuthContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogIn from "./pages/LogIn/LogIn";

function App() {

  const router = createBrowserRouter([
    {path: "/", element:<NavigationBar/>,children: [
      {index: true, element: <HomePage />},
      {path: "/signup", element: <SignUp/>},
      {path: "login", element: <LogIn />}
    ]}
  ]);
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
