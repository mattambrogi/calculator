var coinpriceCurr;

/*
Calculates profit using initial investment amount, initial price, and current price
*/
function calc() {
    //variables
    var initialInvestment = parseFloat(clean(document.getElementById("n1").value));
    var initialPrice = parseFloat(clean(document.getElementById("n2").value));
    var currentPrice;
    var profit;
    var assetsTot;
    var option = document.getElementById("formcontrol").value;
    

    //depending on user choice, get market or input value
    if (document.getElementById("pricecontrol").value == 'C') {
        currentPrice = parseFloat(clean(document.getElementById("n3").value));
    } else {
        currentPrice = coinpriceCurr;
    }

    //depending on user choice, calculate profit using USD or BTC
    if (option == '$') {
        profit = (currentPrice - initialPrice) * (initialInvestment / initialPrice);
        assetsTot = profit + initialInvestment;
    } else {
        profit = initialInvestment * (currentPrice - initialPrice);
        assetsTot= profit + initialInvestment*initialPrice;
    }

    

    //handle inital price of 0
    try {
        if (initialInvestment <= 0) throw "Initial Price Must Be Greater than 0";

        document.getElementById("result").innerHTML = "$" + profit.toFixed(2);
        document.getElementById("total").innerHTML = " Total Assets: $" + assetsTot.toFixed(2);
    }
    catch (err) {
        document.getElementById("warning").innerHTML = err;
    }
}


/*
If dollar sign is input by user, removes for calculation
*/
function clean(element) {
    if (element[0] == '$') {
        return element.slice(1);
    }
    return element;
}


/* 
control principle / initial investment placeholder based on selection
*/
function selection() {
    var option = document.getElementById("formcontrol").value;

    if (option == '$') {
        document.getElementById("n1").placeholder = "$";
    } else {
        document.getElementById("n1").placeholder = "BTC";

    }
}

/* 
control current price based on price selection
*/
function priceselection() {
    var option = document.getElementById("pricecontrol").value;

    if (option == 'C') {
        //make non read only
        document.getElementById("n3").placeholder = "$";
        document.getElementById("n3").removeAttribute("readonly");
    } else {
        document.getElementById("n3").placeholder = "$" + coinpriceCurr;
        document.getElementById("n3").readOnly = true;
        document.getElementById("n3").value = "";
    }

}



/* 
gets current coin price from coinbase api
*/
var request = new XMLHttpRequest();
var requestURL = "https://api.coinbase.com/v2/prices/spot?currency=USD";

request.open("GET", requestURL);
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var coinbase = JSON.parse(this.responseText);
        coinpriceCurr = coinbase.data.amount;
        document.getElementById("n3").placeholder = '$' + coinpriceCurr;
    }
}
request.send();















