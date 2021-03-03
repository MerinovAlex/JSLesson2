"use strict";
class ProductList {
	#goods;
	constructor(container = ".products") {
		this.container = container;
		this.#goods = [
			{
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
		];

		this.#render();
	}

	static countAmount = [];
	static countPrice = [];

	#render() {
		const block = document.querySelector(this.container);
		for (let product of this.#goods) {
			const productObject = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", productObject.render());
			document.querySelector(`.buy-btn${product.id}`).addEventListener("click", () => productObject.renderButtonId(productObject));
		}
		BasketItem.prototype.sumBusket();
		BasketItem.prototype.clearBattonBasket(this.#goods);
	}
}

class ProductItem {
	constructor(product, img = "https://mybuzines.ru/marinbiz.ru/wp-content/uploads/2011/07/pic_questions_12.jpg", container = ".basket") {
		this.id = product.id;
		this.product_name = product.product_name;
		this.price = product.price;
		this.img = img;
		this.container = container;
	}

	render() {
		return `<div class="product-item${this.id}" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn${this.id}">Купить</button>
            </div>`;
	}

	renderButtonId(product) {
		const block = document.querySelector(this.container);
		const productObject = new BasketItem(product);
		ProductList.countAmount.push(product.id);
		ProductList.countPrice.push(product.price);
		block.insertAdjacentHTML("beforeend", productObject.renderButtonId(productObject));
	}
}

class BasketItem extends ProductItem {
	constructor(product, id, product_name, price, img) {
		super(product, id, product_name, price, img);
	}

	renderButtonId(product) {
		this.sumBusket();
		return `<div class="product-item${product.id}" data-id="${product.id}">
	            <img src="${product.img}" alt="Some img">
	                <h3>${product.product_name}</h3>
	                <p>${product.price} \u20bd</p>
			</div>`;
	}

	sumBusket() {
		let sum = ProductList.countPrice.reduce((total, countPrice) => total + countPrice, 0);
		let sum2 = ProductList.countAmount.length;
		if (ProductList.countAmount.length) {
			document.getElementById("div_word").innerHTML = `В корзине ${sum2} позиций(я) стоимостью ${sum} \u20bd`;
		} else {
			document.getElementById("div_word").innerHTML = `Корзина пуста`;
		}
	}
	clearBattonBasket(product) {
		document.getElementById("basket_button").addEventListener("click", () => BasketItem.prototype.clearBasket(product));
	}

	clearBasket() {
		ProductList.countAmount = [];
		ProductList.countPrice = [];
		BasketItem.prototype.sumBusket();
		document.querySelector(".basket").innerHTML = `<div class="basket_text">Корзина</div>`;
	}
}

const productList = new ProductList();
