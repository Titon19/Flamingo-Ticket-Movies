export interface Pagination {
  current_page: number;
  total_pages: number;
  total_items: number;
  limit: number;
  page_collections: number[];
}

export interface PaginationResponse {
  current_page: number;
  total_pages: number;
  total_items: number;
  limit: number;
  page_collections: number[];
}
