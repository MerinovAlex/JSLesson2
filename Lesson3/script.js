"use strict";

// Перевел на промисы
// let getRequest = (url) => {
// 	return new Promise((resolve, reject) => {
// 		let xhr = new XMLHttpRequest();
// 		xhr.open("GET", url, true);
// 		xhr.onreadystatechange = () => {
// 			if (xhr.readyState === 4 && xhr.status === 200) {
// 				resolve(xhr.responseText);
// 			} else {
// 				reject("Error");
// 			}
// 		};
// 		xhr.send();
// 	});
// };
const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/";
class ProductList {
	constructor(container = ".products") {
		this.container = container;
		this.goods = [];
		this.countAmount = [];
		this.countPrice = [];
		this.allProducts = [];
		// BasketItem.prototype.sumBusket();
		// BasketItem.prototype.clearBattonBasket(this.goods);
		this.dataRender();
		this._init();
	}

	getURL(API) {
		return fetch(API)
			.then((result) => result.json())
			.catch((error) => {
				console.log(error);
			});
	}

	dataReturn(data) {
		this.goods = [...data];
		this.render();
	}

	dataRender() {
		this.getURL(`${API}catalogData.json`).then((data) => this.dataReturn(data));
	}

	render() {
		const block = document.querySelector(this.container);
		for (let product of this.goods) {
			const productObject = new ProductItem(product);
			block.insertAdjacentHTML("beforeend", productObject.render());
			document.querySelector(`.buy-btn${product.id_product}`).addEventListener("click", () => productObject.renderButtonId(productObject));
		}
	}

	_init() {
		document.querySelector(".basket_button").addEventListener("click", () => {
			this.invis(".basket");
		});
	}

	invis(block) {
		let block_name = document.querySelector(block);
		let main_name = document.querySelector("main");
		if (block_name.style.display === "grid") {
			block_name.style.display = "none";
			main_name.style.gridTemplateColumns = "1fr";
		} else {
			block_name.style.display = "grid";
			main_name.style.gridTemplateColumns = "1fr 1fr";
		}
		console.log(this.allProducts);
	}
}

class ProductItem extends ProductList {
	constructor(product, img = "https://mybuzines.ru/marinbiz.ru/wp-content/uploads/2011/07/pic_questions_12.jpg", container) {
		super(container);
		this.id_product = product.id_product;
		this.product_name = product.product_name;
		this.price = product.price;
		this.img = img;
		this.allProducts;
	}

	render() {
		return `<div class="product-item${this.id_product}" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn${this.id_product}">Купить</button>
            </div>`;
	}

	renderButtonId(product) {
		this.allProducts.push(product);
		this.countAmount.push(product.id_product);
		this.countPrice.push(product.price);
		const cart = new BasketItem(this.allProducts);
		return console.log(this.countPrice);
	}
}

class BasketItem extends ProductItem {
	constructor(container = ".basket") {
		super(container);
		this.allProducts;
		this.id_product = this.allProducts.id_product;
		this.product_name = this.allProducts.product_name;
		this.price = this.allProducts.price;
		this.renderBasket;
	}

	renderBasket() {
		// this.sumBusket();
		console.log(this.allProducts.price);
		return `<div class="product-item${this.allProducts.id}" data-id="${this.allProducts.id}">
	            <img src="${this.allProducts.img}" alt="Some img">
	                <h3>${this.allProducts.product_name}</h3>
	                <p>${this.allProducts.price} \u20bd</p>
			</div>`;
	}
}

// class Basket {
// 	sumBusket() {
// 		let sum = ProductList.countPrice.reduce((total, countPrice) => total + countPrice, 0);
// 		let sum2 = ProductList.countAmount.length;
// 		if (ProductList.countAmount.length) {
// 			document.getElementById("div_word").innerHTML = `В корзине ${sum2} позиций(я) стоимостью ${sum} \u20bd`;
// 		} else {
// 			document.getElementById("div_word").innerHTML = `Корзина пуста`;
// 		}
// 	}
// 	clearBattonBasket(product) {
// 		document.getElementById("basket_button").addEventListener("click", () => BasketItem.prototype.clearBasket(product));
// 	}

// 	clearBasket() {
// 		ProductList.countAmount = [];
// 		ProductList.countPrice = [];
// 		BasketItem.prototype.sumBusket();
// 		document.querySelector(".basket").innerHTML = `<div class="basket_text">Корзина</div>`;
// 	}
// }

const productList = new ProductList();
