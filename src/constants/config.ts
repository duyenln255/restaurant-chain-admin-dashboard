const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

if (!BASE_API_URL) {
  console.warn("⚠️ BASE_API_URL is not set in .env file!");
}

const config = {
  BASE_API_URL: BASE_API_URL || ""
};

export default config;
