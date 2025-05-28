import { redirect, RouteObject } from "react-router-dom";
import AdminLogin from "../pages/admin/auth/index";
import AdminDashboard from "../pages/admin/dashboard/index";
import AdminWrapper from "../layouts/AdminWrapper";

import Genres from "../pages/admin/genres/index";
import FormGenre from "../pages/admin/genres/form";
import { getSession } from "../lib/utils";
import { detailGenre, getGenres } from "../services/genres/genre.service";

import Theaters from "../pages/admin/theaters/index";
import {
  detailTheater,
  getCities,
  getTheaters,
} from "../services/theaters/theater.service";
import FormTheater from "../pages/admin/theaters/form";

import Movies from "../pages/admin/movies/index";
import FormMovie from "../pages/admin/movies/form";
import { detailMovie, getMovies } from "../services/movies/movie.service";

import Customers from "../pages/admin/customers/index";

import TicketTransactions from "../pages/admin/transactions/tickets/index";

import WalletTransactions from "../pages/admin/transactions/wallets/index";

import UserProfile from "../pages/admin/profile/form";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <AdminWrapper />,
    loader: () => {
      const user = getSession();
      // console.log(user);

      if (!user || user.role !== "admin") {
        throw redirect("/admin/login");
      }
      return user;
    },
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/admin/genres",
        element: <Genres />,
      },
      {
        path: "/admin/genres/create",
        element: <FormGenre />,
      },
      {
        path: "/admin/genres/edit/:id",
        element: <FormGenre />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/genres");
          }
          const detail = await detailGenre(params.id);
          return detail;
        },
      },
      {
        path: "/admin/movies",
        element: <Movies />,
        loader: async () => {
          const movies = await getMovies();
          return movies;
        },
      },
      {
        path: "/admin/movies/create",
        element: <FormMovie />,
        loader: async () => {
          const genres = await getGenres();
          const theaters = await getTheaters();
          return { genres, theaters, detail: null };
        },
      },
      {
        path: "/admin/movies/edit/:id",
        element: <FormMovie />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/movies");
          }
          const detail = await detailMovie(params.id);
          const genres = await getGenres();
          const theaters = await getTheaters();

          return { genres, theaters, detail };
        },
      },
      {
        path: "/admin/theaters",
        element: <Theaters />,
      },
      {
        path: "/admin/theaters/create",
        element: <FormTheater />,
        loader: async () => {
          const cities = await getCities();
          return { cities, detail: null };
        },
      },
      {
        path: "/admin/theaters/edit/:id",
        element: <FormTheater />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw redirect("/admin/theaters");
          }
          const theaters = await getTheaters();
          const cities = await getCities();
          const detail = await detailTheater(params.id);

          return { theaters, cities, detail };
        },
      },
      {
        path: "/admin/customers",
        element: <Customers />,
      },
      {
        path: "/admin/ticket-transactions",
        element: <TicketTransactions />,
      },
      {
        path: "/admin/wallet-transactions",
        element: <WalletTransactions />,
      },

      {
        path: "/admin/profile",
        element: <UserProfile />,
        loader: () => {
          const userProfile = getSession();
          return userProfile;
        },
      },
    ],
  },
];

export default adminRoutes;
