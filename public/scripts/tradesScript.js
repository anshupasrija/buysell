
$(document).ready(()=>{
  $.get('/api/trades')
  .then((response)=>{
    console.log(response);

  })
})

  const createTradeCars = (car) =>{
    const tradeCars = $(`<h1 class="vehicles-on-sale">VEHICLES ON SALE</h1>
    <section class="shopping">
      <div class="shopping_subcontainer">
        <h4 class="shopping_heading">${car.brand}</h4>
        <img src="${car.img}" class="shopping_image" alt="vehicle" class="vehicleimg"/>
      </div>
        <div class="information">
          <p>Year: ${car.year}</p>
          <p>Price: 75,000$</p>
          <p>Status: ON SALE!</p>
          <p>Color: White</p>
          <p>Mileage: 14,000 km</p>
          <p>Transmission: automatic</p>
          <p>Fuel Type: Regular</p>
          <button class="send-a-message">SEND A MESSAGE</button>
        </div>
    </section>`);
    return tradeCars;
  };

  const renderCars = (products)=>{
    const carscontainer = $('#cars-container');
    carscontainer.empty();
    for (let i = 0; i < products.length; i++) {
      const product = createTradeCars(products[i]);
      $('#products').prepend(product);
    }
  };

console.log("loaded");
