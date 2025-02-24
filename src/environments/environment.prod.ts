export const environment = {
    production: true,
    authUrl: process.env['NG_ENV_AUTH_URL'] || "https://macha-server.vercel.app/auth/",
    productUrl: process.env['NG_ENV_PRODUCT_URL'] || "https://macha-server.vercel.app/products/"
  };