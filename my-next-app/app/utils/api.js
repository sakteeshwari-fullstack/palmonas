// utils/api.js
export const fetchNavbarItems = async () => {
  const res = await fetch('http://localhost:5000/api/navbar');
  if (!res.ok) throw new Error('Failed to fetch navbar items');
  return res.json();
};
