import service from "@/utils/service";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
// 避免與 store 衝突 後綴 api
export function getProductsApi(page = 1) {
  return service({
    method: "get",
    url: `${baseUrl}/api/${apiPath}/products?page=${page}`,
  });
}
