import fetch from "unfetch"

//2bb2ed45ac741d9c0802


export default function(data, url, callback) {
  if (!JSON.parse(JSON.stringify(data))) {
    callback(
      {
        success: false,
        error: "Improperly Formatted Data"
      }
    )
    return false;
  }
  fetch(url,{
    method: "POST",
    headers: {
      "Content-Type" : 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })
  .then(function(response){
    if (response.ok) {
      return response;
    } else {
      /*
      console.log(response.status);
      var error = new Error({status: response.status});

      return Promise.reject(error);
      */
      throw {success:false, code: response.status};
    }
  })
  .then( r => r.json() )
  .then(function(data){
    let obj = {
      success: true,
      data: data
    }
    callback(obj);

  })
  .catch(function(e) {
     callback(e);
  })
}
