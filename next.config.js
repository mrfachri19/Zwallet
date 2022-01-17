module.exports = {
  reactStrictMode: true,
  env: {
    URL_BACKEND: "https://zwalet.herokuapp.com/",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
      {
        source: "/create-pin",
        destination: "/auth/create-pin",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
      {
        source: "/reset-password/:id",
        destination: "/auth/reset-password/:id",
      },

      // MAIN PAGE
      {
        source: "/home",
        destination: "/main/home",
      },
      {
        source: "/transfer",
        destination: "/main/transfer",
      },
      {
        source: "/history",
        destination: "/main/history",
      },
      {
        source: "/history/:id",
        destination: "/main/history/:id",
      },
      {
        source: "/profile", // source = path sesudah diubah
        destination: "/main/profile", //destination = path sebelum dirubah
      },
      {
        source: "/profile/personal-info",
        destination: "/main/profile/personal-info",
      },
      {
        source: "/profile/change-pin",
        destination: "/main/profile/change-pin",
      },
      {
        source: "/profile/change-password",
        destination: "/main/profile/change-password",
      },
    ];
  },
};
