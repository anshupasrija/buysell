
$(document).ready(()=>{

  const loadCars= ()=>{
  $.get('/api/trades')
  .then((response)=>{
    console.log(response);
    renderCars(response);
  });
};

  const createTradeCars = (car) =>{
    const $tradeCars = $(`
    <section class="shopping">
      <div class="shopping_subcontainer">
        <h4 class="shopping_heading">${car.brand}</h4>
        <img src=${car.image} class="vehicleimg"/>
      </div>
        <div class="information">
          <p>Year:${car.model}</p>
          <p>Price:${car.price}</p>
          <p>model: ${car.model}</p>
          <p>Color: ${car.color}</p>
          <p>Mileage:${car.milege}</p>
          <p>Transmission:${car.transmission}</p>
          <p>Fuel Type:${car.fuel}</p>
          <button class="send-a-message">SEND A MESSAGE</button>
        </div>
    </section>`);
    return $tradeCars;
  };

  const renderCars = (cars)=>{
    const $carscontainer = $('#cars-container');
    $carscontainer.empty();
    for(const car of cars){
      const $car = createTradeCars(car);
      $carscontainer.append($car);
    }

  };
  loadCars();

  const $form = $('#newform');
  $form.on('submit',(event)=>{
    event.preventDefault();
      $.ajax({
      method: "GET",
      url: "/search",
      dataType: "json",
      success: (data) => {
        console.log("data", data);
        renderCars(data);
      },
      error: (err) => {
        console.log(`errro: ${err}`);
      },
    });


  })

})
console.log("loaded");