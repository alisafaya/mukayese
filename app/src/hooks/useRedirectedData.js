import { useHistory } from "react-router-dom";
import StorageService from "../services/StorageService";
import useQuery from "./useQuery";

const useRedirectedData = () => {
  const query = useQuery();
  const history = useHistory();

  const url_string = window.location.href;
  const url = new URL(url_string)
  // const token = (/\?token=([\s\S]*)/.exec(url) || [])[1];
  const token = new URLSearchParams(url.search).get('token')
  const first_name = new URLSearchParams(url.search).get('first_name')
  const last_name = new URLSearchParams(url.search).get('last_name')
  if (token) {
    StorageService.saveAccessToken(token);
    StorageService.saveFullName(first_name, last_name)
    query.delete("token");
    if (query.toString()){
      history.replace({
        search: query.toString(),
      });
    }
  }
};

export default useRedirectedData;
