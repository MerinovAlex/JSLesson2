"use strict";

document.getElementById("button_text1").addEventListener("click", () => {
	document.getElementById("text").textContent = document.getElementById("text").textContent.replace(/'/g, '"');
});

document.getElementById("button_text2").addEventListener("click", () => {
	document.getElementById("text").textContent = document.getElementById("text").textContent.replace(/\B'/g, '"');
});

document.getElementById("button_text3").addEventListener("click", () => {
	window.location.reload();
});
