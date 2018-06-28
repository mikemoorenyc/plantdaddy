function findIndex(array,value,key) {

	let iv = array.findIndex(function(e){
		if(!key) {
			return e === value;
		} else {
			return e[key] === value;
		}
	});
	if(iv < 0) {return false;}
	return true;
}




export {findIndex};
