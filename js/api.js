async function fetchCoins() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1",
    {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    }
  );

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return await res.json();
}