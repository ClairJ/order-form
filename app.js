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


( function() {
  var selectEl = document.getElementsByTagName('select')[ 0 ];
  Customer.productNames.forEach( function( productName ) {
    var optionEl = document.createElement( 'option' );
    optionEl.value = productName;
    optionEl.textContent = productName;
    selectEl.appendChild( optionEl );
  } );
})();








// ===============================================================
// var liEL = getElementsByName('name')
