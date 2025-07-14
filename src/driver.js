// const PATH_TO_SERVER = "http://localhost"; // for local testings

const PATH_TO_SERVER = import.meta.env.VITE_API_URL; // for deployment
const PATH_TO_API = import.meta.env.VITE_API_VER;
// const PATH_TO_SSE = `${PATH_TO_SERVER}/sse`; // for deployment

/**
 * payload
 * @param {*} t token
 * @returns payload
 */
function pld(t) {
  if (t == undefined || t == "") {
    return { crntuser: "", term: "", role: "", user: "" }; // payload
  } else {
    return JSON.parse(window.atob(t.split(".")[1])); // payload
  }
}

/**
 *
 * @param {*} path
 * @param {*} token
 * @param {*} jdata
 * @param {*} callback for success
 * @param {*} error callback fo error
 */
const postData = async (path, token, jdata, callback) => {
  // console.log("postData started" + JSON.stringify(data));
  // return;
  if (PATH_TO_SERVER === undefined || PATH_TO_API === undefined) {
    console.log("URL or API is not defined in environment variables.");
    callback("URL or API is not defined in environment variables.", null);
    return;
  }
  fetch(`${PATH_TO_SERVER}${PATH_TO_API}${path}?api_token=${token}`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: "data=" + JSON.stringify(jdata),
    // body: `key=${MN_SID}&usr=${CRNTUSER.name}&query=${vquery}`,
  })
    .then((resp) => resp.json())
    .then((jresp) => {
      // console.log(path + ": " + JSON.stringify(jresp));
      callback(null, jresp.rslt);
      // error(null);
      // callback(jresp.rslt);
    })
    .catch((err) => {
      // console.log("EE:" + path + "/ " + err + " data=" + JSON.stringify(jdata));
      callback(err.message, null);
      // error(err.message);
    });
};

/**
 *
 * @param {string} path
 * @param {string} query
 * @param {*} callback for success
 * @param {*} error callback fo error
 */
const getData = async (path, query, callback) => {
  if (PATH_TO_SERVER === undefined || PATH_TO_API === undefined) {
    console.log("URL or API is not defined in environment variables.");
    callback("URL or API is not defined in environment variables.", null);
    return;
  }
  if (query !== undefined && query !== "") {
    query = "?" + query;
  }
  fetch(`${PATH_TO_SERVER}${PATH_TO_API}${path}${query}`, {
    method: "get",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  })
    .then((resp) => resp.json())
    .then((jresp) => {
      callback(null, jresp.rslt);
      // callback(jresp.rslt);
      // error(null);
    })
    .catch((err) => {
      callback(err.message, null);
      // error(err.message);
    });
};

/**
 *
 * @param {string} usr JSON base64 encoded
 * @returns JSON response
 */
function authFetch(usr) {
  const resp = fetch(`${PATH_TO_SERVER}${PATH_TO_API}/auth`, {
    method: "post",
    mode: "cors",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      // "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    body: `data=${usr}`,
  });
  return resp;
}

/**
 *
 * @param {string} raw
 * @returns JSON | false
 */
function parse(raw) {
  try {
    return JSON.parse(raw);
  } catch (err) {
    return false;
  }
}

export { postData, getData, authFetch, parse };
