'use strict';

function Customer( name, address ) {
  this.name = name;
  this.address = address;
  this.orders = ( function() {
    var cart = [];
    Customer.productNames.forEach( function() {
      cart.push( 0 );
    } );
    return cart;
  })();
}

Customer.productNames = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

Customer.imgPaths = ( function() {
  var paths = [];
  Customer.productNames.forEach( function( element, index ) {
    var ext = '.jpg';
    if ( element === 'sweep' ) {
      ext = '.png';
    } else if ( element === 'usb' ) {
      ext = '.gif';
    }
    paths.push( 'img/' + Customer.productNames[ index ] + ext );
  });
  return paths;
})();

Customer.handleAddItem = function( event ) { //handler for first page
  event.preventDefault();
  // var itemIndex = Customer.productNames.indexOf( event.target.select.value );
  // var quantity = event.target.input.value;
  var arry = ['select', 'qty', 'name', 'street', 'city', 'state', 'phonenumber', 'creditcard'];
  arry = arry.map( function( element ) {
    return event.target[ element ].value;
  } );

  console.log( arry );

};

Customer.handleCheckout = function( event ) { //handler for second page
  console.log( 'hey' );
};

( function() { //Creates the drop down list for page one
  if ( document.getElementsByTagName('select')[ 0 ] ) {
    var selectEl = document.getElementsByTagName('select')[ 0 ];
    Customer.productNames.forEach( function( productName ) {
      var optionEl = document.createElement( 'option' );
      optionEl.value = productName;
      optionEl.textContent = productName;
      selectEl.appendChild( optionEl );
    } );
  }
})();

( function() { //Add event listeners to buttons
  var formEl = document.getElementsByTagName( 'form' )[ 0 ];
  if ( formEl ) {
    formEl.addEventListener( 'submit', Customer.handleAddItem );
  } else { //event listener for page 2
    document.getElementsByTagName( 'button' )[ 0 ].addEventListener( 'click', Customer.handleCheckout );
  }
})();












// ===============================================================

function cartTotal() {
  var ulEl = getElementsByName('cartSelection');
  for (var i = 0; i < Customer.orders.length; i++) {
    Customer.orders[i];
    if (Customer.orders[i] > 0) {
      var liEl = document.createElement('li');
      var imgEl = document.createElement('img');
      var h2El = document.createElement('h2');
      var h2El2 = document.createElement('h2');
      imgEl.src = Customer.imgPaths[i];
      h2El.textContent = Customer.name[i];
      h2El2.textContent = 'QTY ' + Customer.orders[i];
      liEl.appendChild(imgEl);
      liEl.appendChild(h2El);
      liEl.appendChild(h2El2);
      ulEl.appendChild(liEl);
    }
  }
}
