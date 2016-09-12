/*
 Реалізувати паттерн декоратор.
 - Написати конструктор User
 - В конструкторі мають сетатись якісь дефолтні значення (можна рендомом) для наступних властивостей: lastVisitDate, globalDiscount, nightDiscount, weekendDiscount,
 ordersCount, ordersTotalPrice, bonus
 - Написати наступні декоратори:
 --- getDiscount(), має перевіряти чи зараз ніч (23:00 - 05:00) і чи зараз робочий день, відповідно сумувати globalDiscount, nightDiscount, weekendDiscount
 в залежності від умов і вертати сумарну знижку;
 --- getBonus(), якщо користувач минулий раз був на сайті протягом останніх 10 днів, то додаємо до бонуса (240 - кількість годин від lastVisitDate до поточного часу).
 Окрім цього додаємо ordersCount;
 */


function User(options) {
    var options = options || {};

    this.discount = {};

    this.lastVisitDate = options.lastVisitDate || new Date();
    this.discount.globalDiscount = options.globalDiscount || 0.1
    this.discount.nightDiscount = options.nightDiscount || 0.2
    this.discount.weekendDiscount = options.weekendDiscount || 0.3

    this.ordersCount = options.ordersCount || 0;
    this.ordersTotalPrice = options.ordersTotalPrice || 0;
    this.bonus = 0.1;
    this.currentDate = new Date();


    this.discountDecorator = function (price, discountTypename) {
        console.log(discountTypename);
        price = price * (1 - this.discount[discountTypename]);
        return price;
    }


    this.getDiscount = function (price) {
        var price = price;
        var originPrice = price;

        //global

        price = this.discountDecorator(price, "globalDiscount");


        //night
        if (this.lastVisitDate.getHours() >= 23 && this.lastVisitDate.getHours() <= 5) {
            price = this.discountDecorator(price, "nightDiscount");

        }

        //weekend
        if (this.lastVisitDate.getDay() == 0 || this.lastVisitDate.getDay() == 1) {
            price = this.discountDecorator(price, "nightDiscount");

        }

        return originPrice - price;
    }


    this.getBonus = function (price) {
        var price = price
        var originPrice = price;
        var hoursFromLastVisit = (this.currentDate - this.lastVisitDate) / (1000 * 60 * 60);
        if (hoursFromLastVisit < 240) {
            price = price * (1 - this.bonus);
        }

        return originPrice - price;
    }

}

//lastVisitDate:new Date(2015,8,10,12,25)
opts = {
    lastVisitDate: new Date("2016-9-09 13:14")
}
user1 = new User(opts);

console.log("your discounted price ", user1.getDiscount(100));
console.log("your bonus  ", user1.getBonus(50));


console.log();

