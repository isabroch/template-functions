function writeCache(key, data, expires) {
  return window.localStorage.setItem(key, JSON.stringify({ data, expires }));
}

function readCache(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

async function fetchCache(url, expireTime = 0) {
  const cached = readCache(url);

  if (cached?.expires > Date.now()) {
    // console.log("use cached data");
    return cached.data;
  }

  // console.log("use fresh data");
  const response = await fetch(url);
  const data = await response.json();
  writeCache(url, data, expireTime);
  return data;
}
