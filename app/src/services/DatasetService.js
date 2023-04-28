import { AUTH_ROUTES, APP_ADDRESS_URL, DATASET_ROUTES } from "../constants/Routes";
import StorageService from "./StorageService";

const redirectToAuth = (id) => {
  window.location = `${AUTH_ROUTES.LOGIN}?redir=${APP_ADDRESS_URL}`;
};

export const downloadDataset = async (id) => {
  try {
    const token = StorageService.getAccessToken();
    if (!token || token === "") {
      redirectToAuth(id);
      return;
    }
    let result = await fetch(DATASET_ROUTES.DOWNLOAD, {
      method: "POST",
      url: DATASET_ROUTES.DOWNLOAD,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dataset: id,
      }),
    });
    let status = result.status;
    if (status >= 400) {
      if (status === 401) {
        StorageService.removeItem("accessToken");
        redirectToAuth(id);
      }
      let resText = await result.text();
      throw resText;
    }
    let resJson = await result.json();

    return resJson;
  } catch (error) {
    return [error, null];
  }
};
