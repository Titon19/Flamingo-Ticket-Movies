import { useLocation, useParams } from "react-router-dom";
import AdminLayout from "./admin-layout";

const AdminWrapper = () => {
  const { id } = useParams();
  const breadcrumbs = [
    { label: "Dashboard", href: "/admin" },
    { label: "Genres", href: "/admin/genres" },
    { label: "Create Genre", href: "/admin/genres/create" },
    { label: "Edit Genre", href: `/admin/genres/edit/${id}` },
    { label: "Movies", href: "/admin/movies" },
    { label: "Create Movie", href: "/admin/movies/create" },
    { label: "Edit Movie", href: `/admin/movies/edit/${id}` },
    { label: "Theaters", href: "/admin/theaters" },
    { label: "Create Theater", href: "/admin/theaters/create" },
    { label: "Edit Theater", href: `/admin/theaters/edit/${id}` },
    { label: "Customers", href: "/admin/customers" },
    { label: "Ticket Transactions", href: "/admin/ticket-transactions" },
    { label: "Wallet Transactions", href: "/admin/wallet-transactions" },
    { label: "Profile", href: "/admin/profile" },
  ];

  const location = useLocation();
  const matchingBreadcrumbs = breadcrumbs.filter((breadcrumb) =>
    location.pathname.startsWith(breadcrumb.href)
  );

  return <AdminLayout breadcrumbs={matchingBreadcrumbs} />;
};

export default AdminWrapper;
