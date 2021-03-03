'use strict';

// Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида

const Products = {
    products: [{
            id: 1,
            product_name: "Мультиварка",
            price: 5000,
            amount: 1,
        },
        {
            id: 2,
            product_name: "Чайник",
            price: 2600,
            amount: 1,
        },
        {
            id: 3,
            product_name: "Плита",
            price: 55000,
            amount: 1,
        },
    ],

    renderProduct(item, img = 'https://mybuzines.ru/marinbiz.ru/wp-content/uploads/2011/07/pic_questions_12.jpg') {
        return `<div class="product-item" data-id="${item.id}">
              <img src="${img}" alt="Some img">
              <h3>${item.product_name}</h3>
              <p>${item.price} \u20bd</p>
              <button class="buy-btn">Добавить в корзину</button>
          </div>`
    },

    renderProducts() {
        this.products.forEach(
            i => {
                document.querySelector('.products').insertAdjacentHTML('beforeend', this.renderProduct(i));
            })
    },

};

Products.renderProducts();