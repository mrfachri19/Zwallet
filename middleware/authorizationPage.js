import cookies from "next-cookies";

export function getDataCookie(context) {
  return new Promise((resolve) => {
    // memfilter cookie nya berdasarkan yang ada di penyimpanan cookie
    let dataCookie = cookies(context);
    if (dataCookie.token) {
      dataCookie.isLogin = true;
    } else {
      dataCookie.isLogin = false;
    }
    resolve(dataCookie);
  });
}
