

$(document).ready(()=>{

  const loadCars= ()=>{
  $.get('/search')
  .then((response)=>{
    console.log("i am response",response);

  });
};
