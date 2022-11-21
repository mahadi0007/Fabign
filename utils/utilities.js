export const getDataKey = () => {
  return `efg/carts`;
};

export const getODPDataKey = () => {
  return `efg/odpcarts`;
};

// push to local storage: a temporary place for database
export const getDatabaseCart = () => {
  const dataKey = getDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data);
};

// push to local storage: a temporary place for database
export const getODPDatabaseCart = () => {
  const dataKey = getODPDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data);
};

export const addToDatabaseCart = (key, count) => {
  const currentCart = getDatabaseCart();
  currentCart[key] = count;
  localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

export const addODPToDatabaseCart = (key, count) => {
  const currentCart = getODPDatabaseCart();
  currentCart[key] = count;
  localStorage.setItem(getODPDataKey(), JSON.stringify(currentCart));
};

export const removeFromDatabaseCart = (key) => {
  const currentCart = getDatabaseCart();
  delete currentCart[key];
  localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

export const removeFromODPDatabaseCart = (key) => {
  const currentCart = getODPDatabaseCart();
  delete currentCart[key];
  localStorage.setItem(getODPDataKey(), JSON.stringify(currentCart));
};

export const processOrder = (cart) => {
  localStorage.removeItem(getDataKey());
};

export const processODPOrder = (cart) => {
  localStorage.removeItem(getODPDataKey());
};

export const getStudioDataKey = () => {
  return `efg/stcarts`;
};

// push to local storage: a temporary place for database
export const getStudioDatabaseCart = () => {
  const dataKey = getStudioDataKey();
  const data = localStorage.getItem(dataKey) || "{}";
  return JSON.parse(data);
};

export const addToStudioDatabaseCart = (key, count) => {
  const currentCart = getStudioDatabaseCart();
  currentCart[key] = count;
  console.log("currentCart");
  console.log(currentCart);
  localStorage.setItem(getStudioDataKey(), JSON.stringify(currentCart));
};

export const removeFromStudioDatabaseCart = (key) => {
  const currentCart = getStudioDatabaseCart();
  delete currentCart[key];
  localStorage.setItem(getStudioDataKey(), JSON.stringify(currentCart));
};

export const processStudioOrder = (cart) => {
  localStorage.removeItem(getStudioDataKey());
};
