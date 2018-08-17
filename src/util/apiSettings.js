
export default function(data, method) {
	
	return {
    	method: method.toUpperCase(),
    	headers: {
      	"Content-Type" : 'application/json'
			},
    	body: JSON.stringify(data),
    	credentials: 'include'
		}
	
	
}
