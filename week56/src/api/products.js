import service from "@/utils/service";

// 避免與 store 衝突 後綴 api
export function getProductsApi(page = 1) {
  return service({
    method: "get",
    url: `/products?page=${page}`,
  });
}
