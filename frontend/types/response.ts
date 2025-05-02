import { PaginationResponse } from "./pagination";

export type baseResponse<Data> = {
  data: Data;
  message: string;
  status: string;
};

export type baseResponseWithPagination<Data> = {
  data: Data;
  meta: PaginationResponse;
  message: string;
  status: string;
};

// export type baseResponsePaginationDate<Data> = {
//   data: Data;
//   pagination: PaginationResponse;
//   filter_range?: {
//     start_date?: string;
//     end_date?: string;
//   };
//   message: string;
//   status: string;
// };
