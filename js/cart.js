$('.btnCart').click(() => console.log('test'))

function addToCart(event) {
    console.log('OK')
    const btnClicked = $(event.target)
    const product = btnClicked.parent().parent().find('.offer__content')
    const price = Number($(product).find('h4').attr('price'))
    const name = $(product).find('p').text()
    const quantity = Number($(product).find('input').val())
    const id = $(product).attr('id')
    const newItem = {
        id: id,
        name: name,
        price: price,
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
                <p style="color: #999;">Discount: $5.00</p>
            </div>

            <div class="quantity" style="color: #333;">
                <input type="number" style="width: 25%;" value=${cart[id].quantity} min="1" oninput="quantityChange(event)">
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
            }
        }
    }
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
    localStorage.setItem('cart', JSON.stringify(cart))
}

function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cartBox = document.find('#cart-box')
    const item = cartBox.findAll('.total')
    console.log(item)
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
                    <input type="number" style="width: 25%;" value=${item.quantity} min="1" oninput="quantityChange(event)">
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
            console.log(total)
        }
    }
}