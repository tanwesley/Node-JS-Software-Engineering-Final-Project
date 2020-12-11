if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded')
} else {
    ready()
}

function ready() {
    // Remove cart items
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // Cart item quantity
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    // adding items to cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    // checkout
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',
    checkoutClicked)
}

function checkoutClicked() {
    alert('Order placed!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    
    //window.open("order/receipt")

    while (cartItems.hasChildNodes()) { // clear order once order is placed
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal() 
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title, price, imgSrc)
    addItemToCart(title, price)
    updateCartTotal()
}

function addItemToCart(title, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    cartRow.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already in your cart')
            return 
        }
    }

    // fill in cart contents
    var cartRowContents = `
    <div class="cart-item cart-column">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE ITEM</button>
    </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',
    removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener
    ('change', quantityChanged)
}

function removeCartItem(event) {
    console.log('removed item')
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var subtotal = 0
    var tax = 0
    var subtotal = 0
    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')
        [0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        console.log(price * quantity)
        
        // price calculations
        subtotal = subtotal + (price * quantity)
        tax = subtotal * 0.0625
        total = subtotal + tax
    }
    
    // format prices
    subtotal = Math.round(subtotal * 100) / 100
    tax = Math.round(tax*100) / 100
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-subtotal-price')[0].innerText = '$' + subtotal
    document.getElementsByClassName('cart-tax-price')[0].innerText = '$' + tax
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}

function quantityChanged(event) {   // triggers when the user changes the quantity of a cart item
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addedToCartPopUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }