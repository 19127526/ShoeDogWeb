export const SERVER_URL="https://feshoedog.click/"
/*https://shoedogadmin.click/*/
export const CLIENT_URL="http://localhost:3000/"

//Server
export const GET_CATEGORIES_URI="category"
export const GET_PRODUCTS_URI="product"
export const ADD_CATEGORIES_URI="category/add"
export const REMOVE_PRODUCT_URI="product/delete"
export const GET_BRANDS_URI="product/brand"
export const ADD_NEW_PRODUCT_URI="product/add"
export const EDIT_PRODUCT_URI="product/update"
export const SEARCH_PRODUCT_URI="product/search/category"
export const DETAIL_PRODUCT_URI="product/detail/"
export const GET_ALL_ORDER_URI="order"
export const REMOVE_ORDER_URI="order/delete"
export const COMPLETE_ORDER_URI="order/complete"
export const POST_LOGIN_URI="auth/login"

export const GET_STATISTIC_YEAR_URI="product/statistic/year";
export const GET_STATISTIC_DAY_URI="product/statistic/day";
export const GET_STATISTIC_MONTH_URI="product/statistic/month";

export const GET_MAX_ITEM_BUY_DAY_URI="product/statistic/maxquantitypurchaseday?limit="
export const GET_MAX_ITEM_BUY_MONTH_URI="product/statistic/maxquantitypurchasemonth?limit="
export const GET_MAX_ITEM_BUY_YEAR_URI="product/statistic/maxquantitypurchaseyear?limit="

export const GET_MIN_ITEM_BUY_DAY_URI="product/statistic/minquantitypurchaseday?limit="
export const GET_MIN_ITEM_BUY_MONTH_URI="product/statistic/minquantitypurchasemonth?limit="
export const GET_MIN_ITEM_BUY_YEAR_URI="product/statistic/minquantitypurchaseyear?limit="
export const GET_PRODUCTS_SOLD_OUT_URI="product/statistic/soldout";

export const POST_LOGIN_JWT="users/signin";
export const POST_REGISTER_JWT="users/create";
export const POST_LOGOUT_JWT="users/signout";

//Client
export const LIST_PRODUCT_BY_CATEGORY_ID="admin/category/"
export const DETAIL_PRODUCT="/admin/category/"
export const ADD_NEW_PRODUCT="/admin/product/add"
export const EDIT_PRODUCT="/admin/product/edit/"
export const ORDER_PRODUCT="/admin/order/process"
export const ORDER_SUCCESS_PRODUCT="/admin/order/success"
export const DASHBOARD="/admin"
export const REGISTER="/admin/register"
export const LOGIN="/login"
