export const SERVER_URL="http://localhost:3001/"
/*http://localhost:3001/*/
/*https://shoedogadmin.click/*/
//api server
export const GET_CATEGORIES_URI="category"
export const GET_PRODUCTS_URI="product"
export const ADD_CATEGORIES_URI="category/add"
export const GET_DETAIL_PRODUCT_URI="product/detail"
export const SEARCH_PRODUCT_URI="product/search"
export const RELATED_PRODUCT_URI="product/related"
export const ADD_ORDER_URI="order/add"



//api provinces
export const GET_ALL_PROVINCES_URL="https://provinces.open-api.vn/api/p/";
export const GET_ALL_DISTRICTS_URL="https://provinces.open-api.vn/api/d/";
export const GET_ALL_WARDS_URL="https://provinces.open-api.vn/api/w/";
//client route
export const DETAIL_PRODUCT_ROUTE="/detail/:proId"
export const ORDER_PRODUCT_ROUTE="/order"
export const ORDER_SUCCESS_ROUTE="/order/success"
export const ERROR_ROUTE="/error"
export const LIST_PRODUCT_CATEGORYID_ROUTE="/product/:product"
export const LIST_PRODUCT_CATEGORYID_PAGE_ROUTE="/product/:product/page=:pageindex"
export const HOME_ROUTE="/"