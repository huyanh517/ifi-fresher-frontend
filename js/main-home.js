$(document).ready(function () {
    $(window).scroll(scrollTop)
    initPage()
    initCartFromStorage()
});

function checkWidth() {
    let windowSize = $(window).width()
    if (windowSize < 450) {
        $('.offer__item').removeClass('col-6')
        $('.offer__item').addClass('col-12')
    } else {
        $('.offer__item').removeClass('col-12')
        $('.offer__item').addClass('col-6')
    }
}
checkWidth()
$(window).resize(checkWidth)

function generateList(data) {
    const productRow = $('.list-product')
    data.map(item => {
        const html = `
        <div class="col-lg-3 col-md-6 col-sm-6 col-6 offer__item">
            <div class="offer__box">
                <div class="offer__card">
                    <div class="${item.img_tag && item.img_tag === "/assets/tag.png" ? "offer__tag1" : "offer__tag"}">
                        ${item.img_tag ? `<img src="${item.img_tag}" alt='product'></img>` : ""}
                    </div>
                    <div class="offer__content" id="${item.id}">
                        <div class="offer__body">
                            <a href="#">
                                <img src="${item.img_src}" alt="tag">
                            </a>
                            <p>${item.title}</p>
                            <h4 price="${item.new_price}">
                                $${item.new_price}
                                <span value="${item.old_price}">$${item.old_price}</span>
                            </h4>
                            <input type="hidden" value="1" />
                        </div>
                    </div>
                    <div class="offer__btn">
                        <button class="btnCart" onclick="addToCart(event)">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
        `
        const $html = $(html)
        productRow.append($html)
    })
}

function initPage() {
    $.ajax({
        url: "http://localhost:3000/products",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        success: function (data) {
            generateList(data)
        },
        error: function (error) {
            console.log('error', error)
        }
    });
}

function scrollTop() {
    let windowHeight = $(window).scrollTop()
    if (windowHeight > 220) {
        $('.btn-scroll').css('opacity', '1')
    } else {
        $('.btn-scroll').css('opacity', '0')
    }
}

$('.btn-scroll').click(() => {
    $(document.documentElement).animate({
        scrollTop: 0
    }, 500)
})

function addToCart(event) {
    const btnClicked = $(event.target)
    const product = btnClicked.parent().parent().find('.offer__content')
    const price = Number($(product).find('h4').attr('price'))
    const oldPrice = Number($(product).find('h4').find('span').attr('value'))
    const name = $(product).find('p').text()
    const quantity = Number($(product).find('input').val())
    const id = $(product).attr('id')
    const newItem = {
        id: id,
        name: name,
        price: price,
        old_price: oldPrice,
        quantity: quantity
    }

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify({}))
    }

    const cart = JSON.parse(localStorage.getItem('cart'))

    if (!cart[id]) {
        cart[id] = newItem
        let cartBox = $('#cart-box')
        const html = `
        <li style="margin-bottom: 20px;display: flex; border: 1px solid #ccc; padding: 10px; border-radius: 3px;box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);"
        class="justify-content-between align-items-center rowItem" id=${id}>
            <div class="name" style="width: 60%">
                <a style="color: #333; text-transform: capitalize" href="#">${cart[id].name}</a>
                <p style="color: #999;">Discount: $${cart[id].old_price.toFixed(2)}</p>
            </div>

            <div class="quantity" style="color: #333;">
                <input type="number" style="width: 25%; outline: none" value=${cart[id].quantity} min="1" oninput="quantityChange(event)">
            </div>

            
                <button type="button" class="cart-close" style="  
                background: #333;
                color: #333;
                padding-right: 20px;
                background: 0;
                border: 0;
                font-size: 18px;
                cursor: pointer;
                font-weight: bold;"
                onclick="deleteItem(event)"
                >×</button>

            <div class="price" style="color: #333;">
                <span value=${cart[id].price}>$${cart[id].price}</span>
            </div>
            </li>
        `
        const $html = $(html)
        cartBox.append($html)

    } else {
        cart[id].quantity += newItem.quantity
        let cartBox = $('#cart-box').find('li')
        for (let i = 0; i < cartBox.length; i++) {
            if ($(cartBox[i]).attr('id') === id) {
                let quantity = Number($(cartBox[i]).find('input').val()) + newItem.quantity
                let price = cart[id].price
                $(cartBox[i]).find('input').val(quantity)
                $(cartBox[i]).find('span').text(`$${Number(quantity * price).toFixed(2)}`)
                $(cartBox[i]).find('span').attr('value', Number(quantity * price).toFixed(2))
            }
        }
    }

    let cartItems = $('#cart-box').find('li')
    let total = 0
    let cartTotal = $('.cart__total')
    let totalCart = cartTotal.find('span')
    let $total = $(totalCart)
    for (let i = 0; i < cartItems.length; i++) {
        let span = $(cartItems[i]).find('span').attr('value')
        total += Number(span)
    }
    $total.text(`$${total.toFixed(2)} USD`)
    $total.attr('value', total)
    localStorage.setItem('cart', JSON.stringify(cart))
}

function formatPrice(price) {
    const formattedPrice = price.toFixed(2)
    return `$${formattedPrice}`
}

function deleteItem(event) {
    const product = $(event.target).parent()
    const id = $(product).attr('id')
    const cart = JSON.parse(localStorage.getItem('cart'))
    delete cart[id]
    $(product).remove()
    let cartItems = $('#cart-box').find('li')
    let total = 0
    let cartTotal = $('.cart__total')
    let totalCart = cartTotal.find('span')
    let $total = $(totalCart)
    for (let i = 0; i < cartItems.length; i++) {
        let span = $(cartItems[i]).find('span').attr('value')
        total += Number(span)
    }
    $total.text(`$${total.toFixed(2)} USD`)
    $total.attr('value', total)
    localStorage.setItem('cart', JSON.stringify(cart))
}

function quantityChange(event) {
    const priceEle = $(event.target).parent().parent().find('.price').find('span')
    const price = $(event.target).val() * $(priceEle).attr('value')
    $(priceEle).text(`$${price}`)
}

function initCartFromStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    let total = 0
    if (cart) {
        let cartBox = $('#cart-box')
        let cartTotal = $('.cart__total')
        let totalCart = cartTotal.find('span')
        let $total = $(totalCart)
        for (let key in cart) {
            let item = cart[key]
            const html = `
            <li style="margin-bottom: 20px; display: flex; border: 1px solid #ccc; padding: 10px; border-radius: 3px;box-shadow: 1px 1px 3px rgb(0 0 0 / 20%);"
            class="justify-content-between align-items-center rowItem" id=${item.id}>
                <div class="name" style="width: 60%">
                    <a style="color: #333; text-transform: capitalize" href="#">${item.name}</a>
                    <p style="color: #999;">Discount: $5.00</p>
                </div>

                <div class="quantity" style="color: #333;">
                    <input type="number" style="width: 25%; outline: none" value=${item.quantity} min="1" oninput="quantityChange(event)">
                </div>

                <button type="button" class="cart-close" style="  
                                background: #333;
                                color: #333;
                                padding-right: 20px;
                                background: 0;
                                border: 0;
                                font-size: 18px;
                                cursor: pointer;
                                font-weight: bold;"
                                onclick="deleteItem(event)"
                                >×</button>

                <div class="price" style="color: #333;">
                    <span value=${item.price}>$${Number(item.price * item.quantity).toFixed(2)}</span>
                </div>
                </li>
                `
            const $html = $(html)
            cartBox.append($html)
            const price = item.price * item.quantity
            total += price
            $total.text(`$${total} USD`)
            $total.attr('value', total)
        }
    }
}




