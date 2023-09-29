import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavigationBar from "./components/NavigationBar/NavigationBar";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogIn from "./pages/LogIn/LogIn";
import CartPage from "./pages/CartPage/CartPage";
import CartContextProvider from "./context/CartContext";

function App() {
  const {currentUser} = useAuth();
  console.log("value ",currentUser);

  const ProtectedRoute = ({ children }) => {
    // if (!currentUser) return <Navigate to="/login" replace={true} />;
    // return children;

    if(currentUser || localStorage.getItem("email") !== ""){
      return children;
    }
    return <Navigate to="/login" replace={true} />;
  };

  const ProtectedSignedInUserRoute = ({ children }) => {
    // if(!currentUser || localStorage.getItem("email") === ""){
    //   return <Navigate to="/login" replace={true} />;
    // }
    if (currentUser || localStorage.getItem("email") !== "") return <Navigate to="/" replace={true} />;
    
    return children;
  };

  const router = createBrowserRouter([
    {path: "/", element:<NavigationBar/>,children: [
      {index: true, element: 
       <ProtectedRoute>
        <HomePage />
       </ProtectedRoute>
      },
      {path: "/signup", element: 
      <ProtectedSignedInUserRoute>
         <SignUp/>
      </ProtectedSignedInUserRoute>},
      {path: "/login", element: 
      <ProtectedSignedInUserRoute>
        <LogIn />
      </ProtectedSignedInUserRoute>  },
      {path: "/cart", element: 
      <ProtectedRoute>
        <CartContextProvider>
          <CartPage />
        </CartContextProvider>
      </ProtectedRoute>    
      }
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
