import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Error from "./pages/Error";
import OrderStatus from "./pages/OrderStatus";
import Checkout from "./pages/Checkout/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/order-status",
    element: <OrderStatus />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;