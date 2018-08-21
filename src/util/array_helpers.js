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

function removeItem(item, array) {
	var index = array.indexOf(item);
	if (index > -1) {
  	return array.splice(index, 1);
	}
	return array.splice();
}
	




export {findIndex, removeItem};
