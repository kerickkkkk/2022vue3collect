import service from "@/utils/service";

export function getCartsApi() {
  return service({
    method: "GET",
    url: `/cart`,
  });
}

export function postCartsApi(id, qty) {
  return service({
    method: "POST",
    url: `/cart`,
    data: {
      data: {
        product_id: id,
        qty,
      },
    },
  });
}

export function putCartApi(cartId, id, qty) {
  return service({
    method: "PUT",
    url: `/cart/${cartId}`,
    data: {
      data: {
        product_id: id,
        qty,
      },
    },
  });
}

export function deleteCartApi(cartId) {
  return service({
    method: "DELETE",
    url: `/cart/${cartId}`,
  });
}

export function deleteAllCartsApi() {
  return service({
    method: "DELETE",
    url: `/carts`,
  });
}
