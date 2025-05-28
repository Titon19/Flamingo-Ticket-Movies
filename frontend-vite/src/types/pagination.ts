export interface Pagination {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  limit: number;
  pageCollections: number[];
}

export interface PaginationResponse {
  currentPage: number;
  totalData: number;
  totalPages: number;
  limit: number;
  pageCollections: number[];
}
