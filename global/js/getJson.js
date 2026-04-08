// getJson.js

export async function getJson(Path) {
  const Response = await fetch(Path);

  if (!Response.ok) {
    throw new Error(`Failed to fetch ${Path} (${Response.status})`);
  }

  return await Response.json();
}