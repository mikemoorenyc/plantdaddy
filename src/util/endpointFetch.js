import fetch from "unfetch"

//1d9343bbe55960545c8f


export default function(data, url, method,callback) {

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
    method: method.toUpperCase(),
    headers: {
      "Content-Type" : 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  })
	.then(function(response){
    if(response.status > 299) {
			throw {
				success:false,
				status : response.status,
				code: response.headers.get('Error-Code')
			}
		} else {
			return response.json();
		}

  })
  .then(function(r){
		callback({
			success: true,
			data: r
		})
		return {success:true, data: r};
  })
	.catch(function(error) {
		return error;
	})

}
