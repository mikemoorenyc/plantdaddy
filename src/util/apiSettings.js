
export default function(data, method) {
	
	return {
    	method: method,
    	headers: {
      	"Content-Type" : 'application/json'
			},
    	body: JSON.stringify(data),
    	credentials: 'include'
		}
	
	
}
