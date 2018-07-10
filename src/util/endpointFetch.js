import fetch from "unfetch"

//1d9343bbe55960545c8f


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

  .then( r => r.text() )
  .then(function(d){
    callback(d);

  })
  .catch(function(e) {
    console.log(e);

     callback(e);
  })
}
