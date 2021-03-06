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
    loadFavourites();
    popupMessage();

    $('.far.fa-heart').click((evt) => {
      evt.preventDefault();
      $(evt.target).toggleClass("heartred");
      // $(evt.target).parents('.favBtn').click();

    });

    $('.favBtn').click((evt) => {
      $(evt.target).children('i').toggleClass("heartred");
      // console.log($(evt.target).siblings('.btn-group').find('#trade-id').val());
      // $(this).siblings('.btn-group').children('.trade_id')
    });
   };

  const popupMessage = () => {
    $(".popup-message").click(function () {
      $("#trade_id").val($(this).siblings('input').val());
      $("#modal-message").modal('show');
   });
  }



  const loadFavourites= ()=>{
    const $button = $('#favourite');
    $button.click((event)=>{
      event.preventDefault();
      $.ajax({
        url: `/favourites`,
        method: "GET",
        dataType: "json",
        success: (data) => {
          // console.log("data", data);
          renderTrades(data, true);
        },
        error: (err) => {
          console.log(`errro: ${err}`);
        },
      });

  });

 }

  const renderTrades = (trades, isFav=false) => {
    console.log("trades->",typeof trades);
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();
    for (const trade of trades) {
      const $trade = createTradeElement(trade, isFav);
      // console.log(trade);
      $tradesContainer.append($trade);
    }

    eventInit();

  };

  const createTradeElement = (trade, isFav) => {
    const soldStr = (trade.sold === false) ? '' : '<h3>Sold</h3>'
    const soldCss = (trade.sold === false) ? '' : 'item_sold_parent'
    const messageStr = (trade.sold === false) ? '<button type="button" id="btn-message" class="btn btn-sm btn-outline-secondary popup-message" >Message</button>' : ''
    const carImage = (trade.image) ? trade.image : "default.png";
    const heartred = (trade.heartred) ? 'heartred' : '';
    let favouriteBtn = '';
    if (!isFav && trade.sold === false && document.cookie) {
      favouriteBtn = `
        <button class='favBtn' onClick="(function(){
            $.ajax({
              url: '/favourites',
              method: 'POST',
              dataType: 'json',
              data: JSON.stringify(${trade.id}),
              success: $('.heart${trade.id}').toggleClass('heartred')
            });
            return false;
        })();return false;" ><i class="far fa-heart ${heartred}" id ='heart${trade.id}'></i></button>
      `;
    }
    //

    const $tradeElement = $(`
      <div class="col-md-4">
        <div id="item_sold_parent" class="card mb-4 box-shadow ${soldCss}">
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
              </div>
                ${favouriteBtn}
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
      url: `/api/search?${data}`,
    })
    .then(function(data) {
      renderTrades(data);
      $(".error").hide(250);
      // $form.trigger("reset"); // reset the form like refreshing
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
