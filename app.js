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
  customerInputData = customerInputData.map( function( element ) { //get form values
    var value = event.target[ element ].value;
    return value;
  } );

  if( Customer.customers.length === 0 ) { //if a customer hasn't been created yet, check inputs, exit if empty fields and no localStorage
    if( !customerInputData[ 0 ] || !customerInputData[ 1 ] || !customerInputData[ 2 ] || !customerInputData[ 3 ] || !customerInputData[ 4 ] || !customerInputData[ 5 ] || !customerInputData[ 6 ] || !customerInputData[ 7 ] || !customerInputData[ 8 ] ) {
      return alert('Please fill in all fields to continue.');
    }
  }
  alert('Items successfully added to cart!');
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

Customer.handleCheckout = function() { //handler for second page
  delete localStorage.customerData;
  alert('Thank you! Your order has been processed.');
  window.location.href = 'index.html';
};

function cartTotal(customer) {
  var h1El = document.createElement('h1');
  h1El.textContent = customer.name + '\'s Cart';
  document.getElementsByTagName('header')[0].appendChild(h1El);

  var ulEl = document.getElementsByTagName('ul')[0];
  for (var i = 0; i < customer.orders.length; i++) {
    if (customer.orders[i] > 0) {
      var liEl = document.createElement('li');
      liEl.id = 'product ' + i;
      var imgEl = document.createElement('img');
      var h2El = document.createElement('h2');
      var h2El2 = document.createElement('h2');
      var buttEl = document.createElement('button');
      imgEl.src = Customer.imgPaths[i];
      imgEl.alt = 'product ' + i;
      h2El.textContent = Customer.productNames[ i ];
      h2El2.textContent = 'QTY ' + customer.orders[i];
      buttEl.textContent = 'Delete this item';
      buttEl.name = 'product ' + i;
      liEl.appendChild(imgEl);
      liEl.appendChild(h2El);
      liEl.appendChild(h2El2);
      liEl.appendChild(buttEl);
      ulEl.appendChild(liEl);
    }
  }
}

if( localStorage.customerData ) { //get data if it exists
  Customer.customers[ 0 ] = JSON.parse( localStorage.customerData );
}

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

if( document.getElementsByTagName('form')[0] ) { //listener for 'proceed' button on first page
  document.getElementsByTagName( 'button' )[ 1 ].addEventListener( 'click', function() {
    if( localStorage.customerData ) {
      if( confirm('You should only proceed if you added your last item to the cart.\n\nAre you sure you want to continue?') ) {
        window.location.href = 'cart.html';
      }
    } else {
      alert('You must add at least 1 item to the cart before proceeding.');
    }
  });
}

if ( !document.getElementsByTagName( 'form' )[ 0 ] ) {
  try {
    cartTotal( Customer.customers[ 0 ] );
  }
  catch(e) {
    alert('Errrr...You shouldn\'t be here.\n\nYour cart is empty.\n\nRedirecting...');
    window.location.href = 'index.html';
  }
}

if( document.getElementsByName( 'cartSelection' )[0] ) {
  document.getElementsByName( 'cartSelection' )[0].addEventListener( 'click', function(e) {
    if( e.target.name ) {
      var ulEl = document.getElementsByName( 'cartSelection' )[0];
      var liEl = document.getElementById( e.target.name );
      if( confirm( 'Are you sure you want to remove ' + Customer.productNames[ Number(e.target.name.split( ' ' )[ 1 ]) ] + '?' ) ) {
        ulEl.removeChild( liEl );
        Customer.customers[ 0 ].orders[ Number(e.target.name.split( ' ' )[ 1 ]) ] = 0;
        localStorage.customerData = JSON.stringify( Customer.customers[ 0 ] );
        if( !ulEl.hasChildNodes() ) {
          alert('Your cart is empty, returning you to the store.');
          delete localStorage.customerData;
          window.location.href = 'index.html';
        }
      }
    }
  });
}
