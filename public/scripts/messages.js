$(() => {

  console.log('message.js loaded');

  const loadMessages = () => {
    // load the data
    $.get('/api/messages')
      .then((response) => {
        console.log(response);
        renderTrades(response);
      });

  };

  const renderTrades = (trades) => {
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();

    for (const trade of trades) {
      const $trade = createTradeElement(trade);
      $tradesContainer.append($trade);
    }
  };


  const createTradeElement = (trade) => {

    const soldStr = (trade.sold === false) ? '' : '<h3>Sold</h3>'
    const messageStr = (trade.sold === false) ? '<button class="send-a-message">SEND A MESSAGE</button>' : ''

    const $tradeElement = $(`
    <section class="shopping">
    ${soldStr}
    <div class="shopping_subcontainer">
      <h4 class="shopping_heading">${trade.brand} ${trade.model}</h4>
      <img src="../images/audiseven.png" class="shopping_image" alt="vehicle" class="vehicleimg"/>
    </div>
      <div class="information">
        <p>Year: ${trade.year}</p>
        <p>Price: $${trade.price}</p>
        <p>Color: ${trade.color}</p>
        <p>Mileage: ${trade.mileage}km</p>
        <p>Transmission: ${trade.transission}</p>
        <p>Fuel Type: ${trade.fuel}</p>
        <input id='trade-id' name='trade-id' type="text" value=${trade.id} hidden/>
        <a href="/messages?id=${trade.id}">
        ${messageStr}
        </a>
      </div>
    </section>
    `);

    return $tradeElement;
  };

  // grab the form
  const $form = $('#search-trade-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const data = $form.serialize();
    console.log(data);

    $.get('/search', data)
      .then((response) => {
        console.log("after searching---->",response);
        renderTrades(response);
      });
  });


  loadTrades();
});
