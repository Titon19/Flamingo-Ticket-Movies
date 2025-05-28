import { redirect, RouteObject } from "react-router-dom";
import CustomerLayout from "../layouts/customer-layout";
import SignIn from "../pages/customer/auth/signin";
import SignUp from "../pages/customer/auth/signup";
import Home from "../pages/customer/Home";
import { getSession } from "../lib/utils";
import { getGenres, getMovies } from "../services/global/global.service";
const customerRoutes: RouteObject[] = [
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: async () => {
          const user = await getSession();
          if (!user || user.role !== "customer") return redirect("/sign-in");
          const movies = await getMovies();
          const genres = await getGenres();
          return { user, genres, movies };
        },
      },
    ],
  },
];
export default customerRoutes;
