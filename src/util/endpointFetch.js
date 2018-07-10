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
    if(response.status > 299) {
			throw response.status;
		} else {
			return response.json();
		}
    
  })
  .then(function(r){
		callback({
			success: true,
			data: r
		})
		return false;	
  })
	.catch(function(error) {
		callback({
			success: false,
			code: error
		});
		return false;
	})
  
}
