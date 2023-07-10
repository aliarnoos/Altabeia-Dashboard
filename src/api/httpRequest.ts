const getRequest = (url: string, token?: string) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.responseType = "json";

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
    xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else if (xhr.status === 404) {
        reject("Not found");
      } else {
        reject(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send();
  });
  return promise;
};

const postRequest = (url: string, data: {}, token?: string) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.responseType = "json";

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.onload = () => {
      if (xhr.status === 201) {
        resolve(xhr.response);
      } else if (xhr.status === 404) {
        reject("Not found");
      } else {
        reject(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const putRequest = (url: string, file: FormData) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);

    xhr.responseType = "json";

    xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else if (xhr.status === 404) {
        reject("Not found");
      } else {
        reject(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(file);
  });
  return promise;
};

const patchRequest = (url: string, data: {}, token: string) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PATCH", url);

    xhr.responseType = "json";

    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }
    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else if (xhr.status === 304) {
        reject("Not Modified");
      } else {
        reject(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };

    xhr.send(JSON.stringify(data));
  });
  return promise;
};

const deleteRequest = (url: string, token: string) => {
  const promise: Promise<any> = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", url);

    xhr.responseType = "json";

    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.withCredentials = true;

    xhr.onload = () => {
      if (xhr.status === 201) {
        resolve(xhr.response);
      } else if (xhr.status === 404) {
        reject("Not found");
      } else {
        reject(xhr.response);
      }
    };

    xhr.onerror = () => {
      reject("Something went wrong!");
    };
    xhr.send();
  });
  return promise;
};

export { getRequest, postRequest, putRequest, patchRequest, deleteRequest };
