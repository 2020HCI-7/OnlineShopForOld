//const hostUrl = "http://localhost:8080"
const hostUrl = "http://101.132.98.60:12345"
const loginUrl = "/login/wx"
const registerUrl = "/register/consumer"
const getAllGood = "/goods/getallgood"
const imageUrl = "/image/get"
const getStoreById = "/store/getbyid"
const goodSearch = "/goods/search"
const userCart = "/cart/findbyuserid"
const addToCart = "/cart/add"
const cartEdit = "/cart/edit"
const cartDelete = "/cart/delete"
const cartClean = "/cart/clean"
const addressAdd = "/address/add"
const addressGet = "/address/getbyuserid"
const ordersGet = "/order/getbyuserid"

module.exports = {
  hostUrl,
  loginUrl,
  registerUrl,
  getAllGood,
  imageUrl,
  getStoreById,
  goodSearch,
  userCart,
  addToCart,
  cartEdit,
  cartDelete,
  cartClean,
  addressAdd,
  addressGet,
  ordersGet
}