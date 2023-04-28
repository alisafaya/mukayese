const StorageKeys = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  firstName: "first_name",
  lastName: "last_name",
  email: "email"
};

const saveAccessToken = (accessToken) => {
  localStorage.setItem(StorageKeys.accessToken, accessToken);
};

const saveRefreshToken = (refreshToken) => {
  localStorage.setItem(StorageKeys.refreshToken, refreshToken);
};

const saveFullName = (firstName, lastName) => {
  localStorage.setItem(StorageKeys.firstName, firstName)
  localStorage.setItem(StorageKeys.lastName, lastName)
}

const getAccessToken = () => {
  return localStorage.getItem(StorageKeys.accessToken);
};

const getRefreshToken = () => {
  return localStorage.getItem(StorageKeys.refreshToken);
};

const getFullName = () => {
  let first_name = localStorage.getItem(StorageKeys.firstName)
  let last_name = localStorage.getItem(StorageKeys.lastName)
  if (last_name !== "null"){
    return first_name +  ' ' + last_name
  }
  else {
    return first_name
  }
}


const removeAccessToken = () => {
  return localStorage.removeItem(StorageKeys.accessToken);
};

const removeRefreshToken = () => {
  return localStorage.removeItem(StorageKeys.refreshToken);
};

const removeFullName = () => {
  return localStorage.removeItem(StorageKeys.firstName) && localStorage.removeItem(StorageKeys.lastName)

}

const removeItem = (key) => {
  return localStorage.removeItem(key);
};

const StorageService = {
  StorageKeys,
  saveAccessToken,
  saveRefreshToken,
  saveFullName,
  getAccessToken,
  getRefreshToken,
  getFullName,
  removeAccessToken,
  removeRefreshToken,
  removeFullName,
  removeItem,
};

export default StorageService;
