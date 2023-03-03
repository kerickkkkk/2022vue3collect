import service from "@/utils/service";
/*
{
  "data": {
    "user": {
      "name": "test",
      "email": "test@gmail.com",
      "tel": "0912346768",
      "address": "kaohsiung"
    },
    "message": "這是留言"
  }
}
*/
export function postOrderApi(data) {
  return service({
    method: "POST",
    url: `/order`,
    data,
  });
}
