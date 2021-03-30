function writeCache(key, data, expires) {
  return window.localStorage.setItem(key, JSON.stringify({ data, expires }));
}

function readCache(key) {
  return JSON.parse(window.localStorage.getItem(key));
}

async function fetchCache(url, expireTime = 0) {
  const cached = readCache(url);
  const willExpire = expireTime > 0;
  const isExpired = cached?.expires < Date.now();

  if (cached !== null && (!isExpired || !willExpire)) {
    return cached.data;
  }

  const response = await fetch(url);
  const data = await response.json();
  writeCache(url, data, expireTime);
  return data;
}
