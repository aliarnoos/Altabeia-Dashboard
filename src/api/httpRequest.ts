const sendHttpRequest = (
  method: string,
  url: string,
  data?: {},
  token?: string
) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.responseType = "json";

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

export default sendHttpRequest;
