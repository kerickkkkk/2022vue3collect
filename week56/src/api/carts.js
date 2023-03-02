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

export function putCartApi(id, qty) {
  return service({
    method: "PUT",
    url: `/cart/${id}`,
    data: {
      data: {
        product_id: id,
        qty,
      },
    },
  });
}

export function deleteCartApi(id) {
  return service({
    method: "DELETE",
    url: `/cart/${id}`,
  });
}

export function deleteCartstApi() {
  return service({
    method: "DELETE",
    url: `/carts`,
  });
}
