async function fetchCoins() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1"
    );

    if (!res.ok) {
      console.error("HTTP Error:", res.status);
      return null;
    }

    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Network Error:", error);
    return null;
  }
}