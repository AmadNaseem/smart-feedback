export async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  const data = await res.json();
  console.log("Fetched data:", data);
  if (!res.ok) throw new Error(data.message || "API Error");
  return data;
}
