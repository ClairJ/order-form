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
  Customer.customers.push( this );
}

if( document.getElementsByTagName('form')[0] ) {
  document.getElementsByTagName( 'button' )[ 1 ].addEventListener( 'click', function() {
    if( localStorage.customerData ) {
      if( confirm('Are you sure you want to continue? Did you add your last item to the cart?') ) {
        window.location.href = 'cart.html';
      }
    } else {
      alert('You must add at least 1 item to the cart before proceeding.');
    }
  });
}

Customer.customers = [];

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
  var customerInputData = ['select', 'qty', 'name', 'street', 'city', 'state', 'zip', 'phonenumber', 'creditcard'];
  customerInputData = customerInputData.map( function( element ) {
    var value = event.target[ element ].value;
    return value;
  } );

  if( Customer.customers.length === 0 ) { //if a customer hasn't been created yet, check inputs
    if( !customerInputData[ 0 ] || !customerInputData[ 1 ] || !customerInputData[ 2 ] || !customerInputData[ 3 ] || !customerInputData[ 4 ] || !customerInputData[ 5 ] || !customerInputData[ 6 ] || !customerInputData[ 7 ] || !customerInputData[ 8 ] ) {
      return alert('Please fill in all fields to continue.');
    }
  }

  ['select', 'qty', 'name', 'street', 'city', 'state', 'zip', 'phonenumber', 'creditcard'].forEach( function( element, index ) {
    if( index > 0 ) {
      event.target[ element ].value = null;
    } else {
      event.target[ element ].value = 'bag';
    }
  } );

  customerInputData[ 0 ] = Customer.productNames.indexOf( customerInputData[ 0 ] );
  var address = {
    street: customerInputData[ 3 ],
    city: customerInputData[ 4 ],
    state: customerInputData[ 5 ],
    zipCode: customerInputData[ 6 ],
    phoneNumber: customerInputData[ 7 ],
    creditCard: customerInputData[ 8 ]
  };

  if( Customer.customers.length === 0 ) {
    new Customer( customerInputData[ 2 ], address );
  }

  //update customer order data
  Customer.customers[ 0 ].orders[ customerInputData[ 0 ] ] += Number( customerInputData[ 1 ] );
  localStorage.customerData = JSON.stringify( Customer.customers[ 0 ] );
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
