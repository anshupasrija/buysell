$(() => {
  console.log('loaded');

  const loadTrades = () => {
    // load the data
    $.get('/api/trades')
      .then((response) => {
        renderTrades(response);
      });
  };

  const eventInit = () => {
    // loadFavourites();
    $('.far.fa-heart').click((evt) => {
      evt.preventDefault();
      $(evt.target).toggleClass("heartred");
    });

    $('.btn-item-delete').click(function () {
      // console.log($(this).siblings('input').val());
      if(confirm('Delete item?')){
        itemDelete($(this).siblings('input').val());
      }
   });

   $('.btn-item-sold').click(function () {
    // console.log($(this).siblings('input').val());
      itemSold($(this).siblings('input').val());
   });

  };

  const itemDelete = (trade_id) =>{
    $.ajax({
      url: '/admin/delete',
      method: 'POST',
      dataType: 'json',
      data: trade_id,
      success: () => {
        loadTrades();
      }
    })
  };

  const itemSold = (trade_id) =>{
    $.ajax({
      url: '/admin/sold',
      method: 'POST',
      dataType: 'json',
      data: trade_id,
      success: () => {
        loadTrades();
      }
    })
  };

//   const loadFavourites= ()=>{
//     const $button = $('#favourite');
//     $button.click((event)=>{
//       event.preventDefault();
//       $.ajax({
//         url: `/favourites`,
//         method: "GET",
//         dataType: "json",
//         success: (data) => {
//           console.log("data", data);
//           renderTrades(data);
//         },
//         error: (err) => {
//           console.log(`error: ${err}`);
//         },
//       });

//   });

//  }

  const renderTrades = (trades) => {
    console.log("trades->",typeof trades);
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();
    for (const trade of trades) {
      const $trade = createTradeElement(trade);
      // console.log(trade);
      $tradesContainer.append($trade);
    }

    eventInit();

  };

  const createTradeElement = (trade) => {
    const soldStr = (trade.sold === false) ? '' : '<h3>Sold</h3>'
    const soldCss = (trade.sold === false) ? '' : 'item_sold_parent'
    const messageStr = (trade.sold === false) ? '<button type="button" id="btn-message" class="btn btn-sm btn-outline-warning btn-item-sold" >Sold</button>' : '<button type="button" id="btn-message" class="btn btn-sm btn-outline-warning btn-item-sold" >Relist</button>'
    const carImage = (trade.image) ? trade.image : "default.png";

    const $tradeElement = $(`
      <div class="col-md-4">
        <div id="item_sold_parent" class="card mb-4 box-shadow ${soldCss}" >
        ${soldStr}
          <img class="card-img-top" data-src="" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="../images/itemImages/${carImage}" data-holder-rendered="true">
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
                <button type="button" id="btn-delete" class="btn btn-sm btn-outline-danger btn-item-delete" >Delete</button>
              </div>
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

  const $messageForm = $('#form-message');
  $messageForm.on('submit', (event) => {
    event.preventDefault();
    const data = $messageForm.serialize();
    $.ajax({
      method: "POST",
      url: "/messages",
      data: data,
      dataType:'text',
      success: function (data) {
          console.log("Sucess : sending email");
          $("#modal-message").modal('hide');
      },
      complete: function () {
        $messageForm.trigger("reset");
        $("#modal-message").modal('hide');
      },
      error: function (data) {
        console.log("Fail:",data);
        $("#modal-message").modal('hide');
      }
    });
  });

  loadTrades();

});
