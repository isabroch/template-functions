// groups an array of objects by key
// returns an es6 map
function groupByKey(key, array) {
  const grouped = new Map();

  array.forEach((item) => {
    const groupedKey = item[key];
    
    if (groupedKey === undefined) {
      throw `${key} doesn't exist in item: ${JSON.stringify(item, null, 2)}`;
    }

    if (!grouped.has(groupedKey)) {
      grouped.set(groupedKey, []);
    }

    grouped.get(groupedKey).push(item);
  });

  return grouped;
}
