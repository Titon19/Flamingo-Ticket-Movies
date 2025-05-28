import { useLocation, useNavigate } from "react-router-dom";
import { ticketFilterDate } from "../../services/transactions/tickets/ticket.service";
import { format } from "date-fns";

const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getQueryParams = () => {
    const searchParam = new URLSearchParams(location.search);
    const search = searchParam.get("search") || "";
    const page = Number(searchParam.get("page") || 1);
    const limit = Number(searchParam.get("limit") || 10);
    const startDate = searchParam.get("start_date") || "";
    const endDate = searchParam.get("end_date") || "";

    return { page, limit, search, startDate, endDate };
  };

  const setQueryParams = (
    page: number,
    limit: number,
    search: string = "",
    data?: ticketFilterDate
  ) => {
    const searchParam = new URLSearchParams(location.search);

    searchParam.set("page", String(page));
    searchParam.set("limit", String(limit));
    if (search) {
      searchParam.set("search", search || "");
    } else {
      searchParam.delete("search");
    }
    if (data?.start_date) {
      searchParam.set("start_date", format(data.start_date, "yyyy-MM-dd"));
    } else {
      searchParam.delete("start_date");
    }
    if (data?.end_date) {
      searchParam.set("end_date", format(data.end_date, "yyyy-MM-dd"));
    } else {
      searchParam.delete("end_date");
    }

    const newUrl = `?${searchParam.toString()}`;
    const currentUrl = location.search;
    if (newUrl !== currentUrl) {
      navigate(newUrl);
    }
  };

  return { getQueryParams, setQueryParams };
};

export default useQueryParams;
