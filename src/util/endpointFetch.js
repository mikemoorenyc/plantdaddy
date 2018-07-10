import fetch from "unfetch"

//1d9343bbe55960545c8f


export default function(data, url, callback) {
	let endResponse = {};
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
    endResponse.status = response.status;
    return response.json();
  })
  .then(function(r){
		endResponse.data = r;
		if(endResponse.status > 299) {
			endResponse.success = false
			callback(endResponse);
			return false;
		}
		endResponse.success = false;
    callback(endResponse);
		return false;
  })
  
}
