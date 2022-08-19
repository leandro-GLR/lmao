import axios from "axios";
import { APIREST } from ".";

const instance = axios.create({
  baseURL: APIREST,
});

const get = (url) => {
  return instance
    .get(url, { withCredentials: true })
    .then((res) => {
      /* console.log(res); */
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

const post = (url, data) => {
  return instance
    .post(url, data, { withCredentials: true })
    .then((res) => {
      /*  console.log(res); */
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

const put = (url, data) => {
  return instance
    .put(url, data, { withCredentials: true })
    .then((res) => {
      /* console.log(res); */
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

const del = (url) => {
  return instance
    .delete(url, { withCredentials: true })
    .then((res) => {
      /*  console.log(res); */
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err.response.data;
    });
};

export default instance;
export { get, post, put, del };
