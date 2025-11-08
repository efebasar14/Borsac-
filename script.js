function loadTradingViewWidget(symbol) {
    const widgetContainer = document.getElementById("tradingview_0");
    widgetContainer.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
        "symbol": symbol,
        "width": "100%",
        "locale": "tr",
        "colorTheme": "light",
        "isTransparent": false
    });

    widgetContainer.appendChild(script);
}

// Varsayılan sembol
loadTradingViewWidget("BIST:THYAO");

// Form submit
document.getElementById("symbolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const newSymbol = document.getElementById("symbolInput").value;
    loadTradingViewWidget(newSymbol);
});
