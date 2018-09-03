/**
 * Created by mssimi on 6/1/17.
 */

/*cart scripty*/

function changeQty(event) {
    var elem = event.currentTarget;

    var request = new XMLHttpRequest();

    if (elem == undefined) {
        elem = event;
    }

    request.open('GET', Routing.generate('_cart_change_qty', {
        id: elem.dataset.productId,
        qty: elem.value
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);
            console.log(data);

            if (data.isEmpty) {
                window.location.replace(Routing.generate('_cart_empty'), true);
            }

            document.querySelector('[cart-item-sum-' + elem.dataset.productId + ']').innerHTML = data.itemSum;

            if (jQuery('input[data-product=' + elem.dataset.productId + ']').val() == 0) {
                jQuery('input[data-product=' + elem.dataset.productId + ']').closest('.cart__list__row').remove();
            }

            var cart = $('.header__cart').find("a");
            var newQty = $(cart).text().replace(/[0-9]+/, data.qty);
            $(cart).text(newQty);

            document.querySelector('[cart-sum]').innerHTML = data.sum;
            // document.querySelector('[cart-items-qty]').innerHTML = data.qty;
            document.querySelector('[cart-total-sum]').innerHTML = data.itemsSum;

            var elements = document.querySelectorAll('[cart-items-sum]');

            Array.prototype.forEach.call(elements, function(el, i) {
                el.innerHTML = data.itemsSum;
            });

            var elements = document.querySelectorAll('[cart-items-sum-no-tax]');

            Array.prototype.forEach.call(elements, function(el, i) {
                el.innerHTML = data.itemsSumNoTax;
            });

            var free = document.getElementsByClassName('free');
            var notFree = document.getElementsByClassName('not-free');

            if (data.isFreeShipping) {
                Array.prototype.forEach.call(free, function(el, i) {
                    el.style.display = '';
                });

                Array.prototype.forEach.call(notFree, function(el, i) {
                    el.style.display = 'none';
                });
            } else {
                Array.prototype.forEach.call(free, function(el, i) {
                    el.style.display = 'none';
                });

                Array.prototype.forEach.call(notFree, function(el, i) {
                    el.style.display = '';
                });
            }
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}



function removeItem(id) {
    var request = new XMLHttpRequest();

    request.open('GET', Routing.generate('_cart_remove_item', {
        id: id
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);
            var elements = document.querySelectorAll('.cart-product-' + id);

            if (data.isEmpty) {
                window.location.replace(Routing.generate('_cart_empty'), true);
            }

            Array.prototype.forEach.call(elements, function(el, i) {
                el.parentNode.removeChild(el);
            });

            var elements = document.querySelectorAll('[cart-items-sum]');

            Array.prototype.forEach.call(elements, function(el, i) {
                el.innerHTML = data.itemsSum;
            });

            var elements = document.querySelectorAll('[cart-items-sum-no-tax]');

            Array.prototype.forEach.call(elements, function(el, i) {
                el.innerHTML = data.itemsSumNoTax;
            });

            document.querySelector('[cart-sum]').innerHTML = data.sum;
            document.querySelector('[cart-items-qty]').innerHTML = data.qty;
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}



function changePayment(event) {
    var elem = event.currentTarget;
    var request = new XMLHttpRequest();

    request.open('GET', Routing.generate('_cart_change_payment', {
        id: elem.value
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);

            document.querySelector('[cart-sum]').innerHTML = data.sum;
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}



function changeTransport(event) {
    var elem = event.currentTarget;
    var request = new XMLHttpRequest();

    showRightPayments(elem);

    request.open('GET', Routing.generate('_cart_change_transport', {
        id: elem.value
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);

            document.querySelector('[cart-sum]').innerHTML = data.sum;
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}



function changeCountry(event) {
    var elem = event.currentTarget;
    var request = new XMLHttpRequest();

    request.open('GET', Routing.generate('_cart_change_country', {
        code: elem.value
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);

            document.querySelector('[cart-sum]').innerHTML = data.sum;

            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);

            if (data.isEU) {
                document.getElementById('purchase_transport_1').checked = true;
                document.getElementById('purchase_transport_1').removeAttribute('disabled');
                document.getElementById('purchase_transport_2').setAttribute('disabled', 'disabled');
                document.getElementById('purchase_transport_1').dispatchEvent(evt);
            }

            if (!data.isEU) {
                document.getElementById('purchase_transport_2').checked = true;
                document.getElementById('purchase_transport_2').removeAttribute('disabled');
                document.getElementById('purchase_transport_1').setAttribute('disabled', 'disabled');
                document.getElementById('purchase_transport_2').dispatchEvent(evt);
            }

        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}



function changeClientType(event) {
    var elem = event.currentTarget;
    var request = new XMLHttpRequest();

    request.open('GET', Routing.generate('_cart_change_client_type', {
        type: elem.value
    }), true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);

            document.querySelector('[cart-sum]').innerHTML = data.sum;

            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
    };

    request.send();
}


function showRightPayments(elem) {
    var get = elem.dataset.payments.toString().split('_');
    var checked = false;
    var elements = document.getElementById('purchase_payment').getElementsByClassName('cart-ship-container');

    Array.prototype.forEach.call(elements, function(elem, i) {

        if ($.inArray(elem.querySelector('input').value, get) == -1) {
            elem.style.display = 'none';
            elem.querySelector('input').checked = false;
        } else {
            if (!checked) {
                elem.querySelector('input').checked = true;
            }
            checked = true;
            elem.style.display = '';
        }
    });
}



var addToCart = document.getElementById("add-to-cart");
if (addToCart) {
    addToCart.addEventListener("click", ajaxAddToCart);
}



function ajaxAddToCart(event) {
    event.preventDefault();

    addToCart.setAttribute("disabled", "disabled");

    var request = new XMLHttpRequest();
    var qty = 1;
    var id = document.querySelector('input[name="variant"]:checked').value;

    console.log(qty);

    request.open('GET', Routing.generate('_cart_add', {
        id: id,
        qty: qty
    }), true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText;
            var data = JSON.parse(resp);

            updateHeaderCart(data);
            addToCart.removeAttribute("disabled");
            jQuery.jGrowl('Product added to cart. View your cart in Menu.', {
                theme: 'growl-success-add',
                header: 'Success!',
                life: 5000,
                position: 'bottom-center'
            });
        }
    };

    request.onerror = function() {
        console.log('error');
        addToCart.removeAttribute("disabled")
    };

    request.send();
}




function updateHeaderCart(data) {
    var headerCart = document.getElementsByClassName('header-cart')[0];
    var headerCartContainer = document.getElementsByClassName('header-cart__data')[0];
    var menuCartCounter = document.getElementsByClassName('header-cart-items-qty')[0];

    headerCartContainer.innerHTML = '';

    if (data.isEmpty) {

        headerCartContainer.innerHTML = '<span class="header-cart__empty">shopping cart is empty</span>';

    } else {

        headerCartContainer.innerHTML = '<span class="header-cart__item-title">Items: </span>';

        var o = '<span class="header-cart__items">';
        for (var i = 0; i < data['cartItems'][0].length; i++) {
            var item = data['cartItems'][0][i];

            o += '<span class="header-cart__item">';
            o += '<span class="header-cart__name">' + item['productName'] + '</span>';

            if (item['variantName'] != null) {
                o += '<span class="header-cart__variant">' + item['variantName'] + '</span>';
            }

            o += '<span class="header-cart__qty">' + item['qty'] + 'x</span>';
            o += '</span>';
        }
        o += '</span>';


        // console.log(data.qty);

        menuCartCounter.innerHTML = data.qty;

        headerCartContainer.innerHTML += o;
        headerCartContainer.innerHTML += '<span class="header-cart__total">Total: <span class="header-cart__total-sum">' + data.itemsSum + '</span></span>';

        headerCart.classList.add("show");

        setTimeout(function() {
            headerCart.classList.remove("show");
        }, 3000);
    }

}



var variants = document.getElementsByName('variant');
if (variants) {
    for (var i = 0; i < variants.length; i++) {
        variants[i].addEventListener('change', function(event) {

            var item_stock = this.getAttribute('data-stock');
            var item_price = this.getAttribute('data-price');
            var item_price_no_tax = this.getAttribute('data-price-notax');
            var item_stock_const = this.getAttribute('data-stock-const');

            document.getElementById("item-stock-status").setAttribute("data-item-stock-stat", item_stock_const);
            document.getElementById("price-main").innerHTML = item_price;
            document.getElementById("item-stock-status").innerHTML = item_stock;
            document.getElementById("item-price").innerHTML = item_price;
            document.getElementById("item-price-no-tax").innerHTML = item_price_no_tax;

            if (item_stock_const == 'outOfStock') {
                document.getElementById("add-to-cart").style.display = 'none';
            } else {
                document.getElementById("add-to-cart").style.display = '';
            }
        })
    }
}