$(() => {
  console.log('loaded');
  const loadTrades = () => {
    // load the data
    $.get('/api/trades')
      .then((response) => {
        renderTrades(response);
      });
  };

 const loadFavourites= ()=>{
  const $button = $('#favourite');
  $button.click((event)=>{
    event.preventDefault();
      $.ajax({
        url: `/favourites`,
        method: "GET",
        dataType: "json",
        success: (data) => {
          console.log("data", data);
          renderTrades(data);
        },
        error: (err) => {
          console.log(`errro: ${err}`);
        },
      });

  });

 }
 const postFavourite =()=>{
   const $button =$('text-muted');
   event.preventDefault();
   $.ajax({
     url:`/favourites`
   })
 }
  const renderTrades = (trades) => {
    console.log("trades->",typeof trades);
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();
    for (const trade of trades) {
      const $trade = createTradeElement(trade);
      // console.log(trade);
      $tradesContainer.append($trade);
    }
    loadFavourites();
  };
  const createTradeElement = (trade) => {
    const soldStr = (trade.sold === false) ? '' : '<h3>Sold</h3>'
    const soldCss = (trade.sold === false) ? '' : 'item_sold_parent'
    const messageStr = (trade.sold === false) ? '<button type="button" class="btn btn-sm btn-outline-secondary">Message</button>' : ''
    const $tradeElement = $(`
      <div class="col-md-4">
        <div id="item_sold_parent" class="card mb-4 box-shadow ${soldCss}" >
        ${soldStr}
          <img class="card-img-top" data-src="" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="../images/audiseven.png" data-holder-rendered="true">
          <div class="card-body">
            <p class="card-text">Brand: ${trade.brand}</p>
            <p class="card-text">Model: ${trade.model}</p>
            <p class="card-text">Year: ${trade.year}</p>
            <p class="card-text">Price: $${trade.price}</p>
            <p class="card-text">Color: ${trade.color}</p>
            <p class="card-text">Mileage: ${trade.mileage}km</p>
            <p class="card-text">Transmission: ${trade.transmission}</p>
            <p class="card-text">Fuel Type: ${trade.fuel}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button> -->
                <input id='trade-id' name='trade-id' type="text" value=${trade.id} hidden/>
                ${messageStr}
              </div>
              <button type="submit" class="text-muted"><i class="far fa-heart"></i></button>
            </div>
          </div>
        </div>
      </div>
    `);


    return $tradeElement;
  };
  // grab the form
  const $form = $('#search-trade-form');
  $form.on('submit', (event) => {
    event.preventDefault();
    const data = $form.serialize();
    console.log(data);
    $.ajax({
      method: "GET",
      url: `/search?${data}`,
    })
    .then(function(data) {
      renderTrades(data);
      $(".error").hide(250);
      $form.trigger("reset"); // reset the form like refreshing
    })
    .catch(function(error) {
      console.log(error);
    });
  });
  loadTrades();




});
