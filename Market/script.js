/**You need to find, weigh and buy 15 items in supermarket.
Every item should have place, price and weight.
Also, you need to get a bill for each item. */
var Products = function (name, weight, price, place) {
    this.name = name;
    this.weight = weight;
    this.price = price;
    this.place = place;
};

Products.prototype.result = function () {
       return this.name + ' costed ' + this.weight * this.price +  ' grn and bought in the ' + this.place + ' department.';

};
var bananas = new Products ('Bananas', 3, 15, 'Fruit');
console.log(bananas.result());

var tomatoes = new Products ('Tomatoes', 2, 20, 'Vegitables');
console.log(tomatoes.result());

