const proxy = "https://swiggy-proxy-eight.vercel.app/api/cors";

export const fetchSwiggy = async (url) => {
  const encoded = encodeURIComponent(url);
  const response = await fetch(`${proxy}?url=${encoded}`);
  if (!response.ok) throw new Error("Swiggy API failed");
  return await response.json();
};
