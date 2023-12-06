// import Helpers from '@Utils/Helpers';
import AuthService from '@Service/Auth';

const BASE_URL = 'http://13.58.94.24:8000/api/v1/';
export const BASE_DOMAIN = 'http://13.58.94.24:8000/';
// const BASE_URL = 'http://127.0.0.1:8090/api/v1/';//'http://13.58.94.24:8000/api/v1/';
// export const BASE_DOMAIN = 'http://127.0.0.1:8090/';//'http://13.58.94.24:8000/';


function get(endpoint, params) {
  return request(endpoint, params);
}

function post(endpoint, params) {
  return request(endpoint, params, 'POST');
}

function put(endpoint, params) {
  return request(endpoint, params, 'PUT');
}

function del(endpoint, params) {
  return request(endpoint, params, 'DELETE');
}

async function request(endpoint, params = {}, method = 'GET') {
  let token = await AuthService.getToken();
  console.log('token', token);

  var xmlRequest = new XMLHttpRequest();

  return new Promise(function (resolve, reject) {
    xmlRequest.open(method, BASE_URL + endpoint, true);

    console.log('url', BASE_URL + endpoint);

    xmlRequest.setRequestHeader('Accept', '*/*');
    xmlRequest.setRequestHeader('Content-Type', 'application/json');
    xmlRequest.setRequestHeader('Authorization', token);
    xmlRequest.setRequestHeader('usertype', 'User');

    if (method == 'GET' || method == 'DELETE') {
      xmlRequest.send();
    } else {
      xmlRequest.send(JSON.stringify(params));
    }

    xmlRequest.onreadystatechange = function () {
      // Call a function when the state changes.
      // console.log('xmlRequest.response=>>>', xmlRequest.response);
      if (
        xmlRequest.readyState === XMLHttpRequest.DONE &&
        xmlRequest.status === 200
      ) {
        resolve(JSON.parse(xmlRequest.response));
      }
      if (
        xmlRequest.readyState === XMLHttpRequest.DONE &&
        xmlRequest.status === 400
      ) {
        resolve(JSON.parse(xmlRequest.response));
      }
    };
  });
}
const upload = async (file, endpoint) => {
  var formdata = new FormData();
  // let get_originalname = await getOriginalname(file.path, file.mime);
  formdata.append('image', {
    uri: file.path,
    type: file.mime,
    name: 'file.path',
  });

  // let objArray = Object.keys(object_get);

  // objArray.forEach((element) => {
  //   data.append(element, object_get[element]);
  // });
  // console.log('data9999', data);

  return fetch(apiUrl, {
    headers,
    method: 'post',
    body: data,
    redirect: 'follow',
  }).then(response => response.json());
  // .then(response => {
  //     return response;
  // });
  // console.log("getApi", getApi)

  // let dData = await decrypt(getApi.data);
  // getApi.data = JSON.parse(getApi.data)
  // return JSON.parse(getApi);
};

const FileUpload = async (url, file, object_get = {}) => {
  return new Promise(async function (resolve, reject) {
    let token = await AuthService.getToken();
    let apiUrl = BASE_URL + url;

    console.log('apiUrl', apiUrl);

    var data = new FormData();

    let objArray = Object.keys(object_get);

    objArray.forEach(element => {
      data.append(element, object_get[element]);
    });

    if (file.path != '') {
      let get_originalname = await getOriginalname(file.path);
      // console.log('originalname', get_originalname);
      data.append('image', {
        uri: file.path,
        type: file.mime,
        name: get_originalname,
      });
    }
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
      // console.log("xhr.response", xhr.response)
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      }
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 400) {
        resolve(JSON.parse(xhr.response));
      }
    };

    xhr.open('POST', apiUrl);
    xhr.setRequestHeader('Accept', '/');
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.setRequestHeader('cache-control', 'no-cache');
    xhr.setRequestHeader('Authorization', token);
    xhr.setRequestHeader('usertype', 'User');
    xhr.send(data);
  });
};

const getOriginalname = async data => {
  let arr = data.split('/');
  let lent = Number(arr.length - 1);
  return arr[lent];
};

export default {
  get,
  post,
  put,
  del,
  upload,
  FileUpload,
};
