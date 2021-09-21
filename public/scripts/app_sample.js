$(() => {

  console.log('loaded');

  const loadTrades = () => {
    // load the data
    $.get('/api/trades')
      .then((response) => {
        renderTrades(response);
      });

    // $.ajax({
    //   method: "GET",
    //   url: "/api/trades"
    // }).done((response) => {
    //   // for(user of users) {
    //   //   $("<div>").text(user.name).appendTo($("body"));
    //   // }
    //   console.log(response);
    // });
  };

  const renderTrades = (trades) => {
    console.log("trades->",typeof trades);
    const $tradesContainer = $('#trade-container');
    $tradesContainer.empty();

    for (const trade of trades.trades) {
      const $trade = createTradeElement(trade);
      console.log(trade);
      $tradesContainer.append($trade);
    }
  };



//   <div class="container" id="trade-container">

//   <div class="row">
//     <div class="col-md-4">
//       <div class="card mb-4 box-shadow">
//         <img class="card-img-top" data-src="" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="../images/audiseven.png" data-holder-rendered="true">
//         <div class="card-body">
//           <p class="card-text">Year: 2019</p>
//           <p class="card-text">Price: 75,000$</p>
//           <p class="card-text">Status: ON SALE!</p>
//           <p class="card-text">Color: White</p>
//           <p class="card-text">Mileage: 14,000 km</p>
//           <p class="card-text">Transmission: automatic</p>
//           <p class="card-text">Fuel Type: Regular</p>
//           <div class="d-flex justify-content-between align-items-center">
//             <div class="btn-group">
//               <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button> -->
//               <button type="button" class="btn btn-sm btn-outline-secondary">Message</button>
//             </div>
//             <small class="text-muted">2 days ago</small>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

// </div>



  const createTradeElement = (trade) => {

    const soldStr = (trade.sold === false) ? 'On Sale!' : 'Sold!'

    const $tradeElement = $(`
      <div class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" data-src="" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="../images/audiseven.png" data-holder-rendered="true">
          <div class="card-body">
            <p class="card-text">Brand: ${trade.brand}</p>
            <p class="card-text">Model: ${trade.model}</p>
            <p class="card-text">Year: ${trade.year}</p>
            <p class="card-text">Price: $${trade.price}</p>
            <p class="card-text">Status: ${soldStr}</p>
            <p class="card-text">Color: ${trade.color}</p>
            <p class="card-text">Mileage: ${trade.mileage}km</p>
            <p class="card-text">Transmission: ${trade.transission}</p>
            <p class="card-text">Fuel Type: ${trade.fuel}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <!-- <button type="button" class="btn btn-sm btn-outline-secondary">View</button> -->
                <input id='trade-id' name='trade-id' type="text" value=${trade.id} hidden/>
                <button type="button" class="btn btn-sm btn-outline-secondary">Message</button>
              </div>
              <small class="text-muted">2 days ago</small>
            </div>
          </div>
        </div>
      </div>
    `);

    // const $updateProductForm = $(`
    //   <form>
    //     <label>New Product Name:</label>
    //     <input name="productName" value="${product.product_name}" />
    //     <br/>
    //     <label>New Price:</label>
    //     <input name="price" value="${product.price}" />
    //     <br/>
    //     <button type="submit">Update!</button>
    //   </form>
    // `);

    // $updateProductForm.on('submit', (event) => {
    //   event.preventDefault();
    //   const data = $updateProductForm.serialize();

    //   $.post(`/api/products/${product.id}`, data)
    //     .then(() => {
    //       loadProducts();
    //     });
    // });

    // const $deleteButton = $('<button>').text('DELETE');
    // $deleteButton.on('click', () => {
    //   $.ajax({
    //     url: `/api/products/${product.id}`,
    //     method: 'DELETE'
    //   }).then(() => {
    //     loadProducts();
    //   });
    // });

    // $productElement.append($updateProductForm, $deleteButton);

    return $tradeElement;
  };

  loadTrades();
});





