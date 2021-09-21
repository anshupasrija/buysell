$(() => {

  console.log('loaded');

  const loadTrades = () => {
    // load the data
    $.get('/api/trades')
      .then((response) => {
        console.log(response);
        renderTrades(response);
      });

  };

  const renderTrades = (trades) => {
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();

    for (const trade of trades.trades) {
      const $trade = createTradeElement(trade);
      $tradesContainer.append($trade);
    }
  };

  // <section class="shopping">
  // <div class="shopping_subcontainer">
  //   <h4 class="shopping_heading">Audi S7</h4>
  //   <img src="../images/audiseven.png" class="shopping_image" alt="vehicle" class="vehicleimg"/>
  // </div>
  //   <div class="information">
  //     <p>Year: 2019</p>
  //     <p>Price: 75,000$</p>
  //     <p>Status: ON SALE!</p>
  //     <p>Color: White</p>
  //     <p>Mileage: 14,000 km</p>
  //     <p>Transmission: automatic</p>
  //     <p>Fuel Type: Regular</p>
  //     <button class="send-a-message">SEND A MESSAGE</button>
  //   </div>
  // </section>


  const createTradeElement = (trade) => {

    const soldStr = (trade.sold === false) ? 'On Sale!' : 'Sold!'

    const $tradeElement = $(`
    <section class="shopping">
    <div class="shopping_subcontainer">
      <h4 class="shopping_heading">Audi S7</h4>
      <img src="../images/audiseven.png" class="shopping_image" alt="vehicle" class="vehicleimg"/>
    </div>
      <div class="information">
        <p>Year: ${trade.year}</p>
        <p>Price: $${trade.price}</p>
        <p>Status: ${soldStr}</p>
        <p>Color: ${trade.color}</p>
        <p>Mileage: ${trade.mileage}km</p>
        <p>Transmission: ${trade.transission}</p>
        <p>Fuel Type: ${trade.fuel}</p>
        <input id='trade-id' name='trade-id' type="text" value=${trade.id} hidden/>
        <a href="/messages?id=${trade.id}">
        <button class="send-a-message">SEND A MESSAGE</button>
        </a>
      </div>
    </section>
    `);

    return $tradeElement;
  };

  loadTrades();
});
