let pnum = document.getElementById("pnum"); 

pnum.addEventListener("input", () => { 
    let value = pnum.value.replace(/\D/g, ''); // Remove non-numeric characters 
    if(value.length > 3) { 
        pnum.value = `+(${value.slice(0,3)}) - ${value.slice(3,value.length)}`; 
    }else {             
        pnum.value = pnum.value; 
    } 
}); 
