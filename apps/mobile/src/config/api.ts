const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    'EXPO_PUBLIC_API_BASE_URL is not configured.',
  );
}

export { API_BASE_URL };