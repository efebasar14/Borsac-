const urlParams = new URLSearchParams(window.location.search);
let symbol = urlParams.get("symbol") || "BIST:THYAO";

function loadTradingViewWidget(symbol) {
    const widgetContainer = document.getElementById("tradingview_0");
    widgetContainer.innerHTML = "";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
    script.async = true;

    // TradingView widget ayarları
    script.innerHTML = JSON.stringify({
        "symbol": symbol,
        "width": "100%",
        "locale": "tr",
        "colorTheme": "light",
        "isTransparent": false
    });

    widgetContainer.appendChild(script);
}

function loadFinancialRatios(symbol) {
    // Finnhub sembol formatı: THYAO.IS gibi
    let finnhubSymbol = symbol.replace("BIST:", "") + ".IS";

    fetch(`https://finnhub.io/api/v1/quote?symbol=${finnhubSymbol}&token=YOUR_API_KEY`)
        .then(res => res.json())
        .then(data => {
            const valuationBody = document.getElementById("valuationBody");
            valuationBody.innerHTML = '';

            const ratios = {
                "Güncel Fiyat": data.c,
                "Açılış Fiyatı": data.o,
                "Günlük Yüksek": data.h,
                "Günlük Düşük": data.l,
                "Önceki Kapanış": data.pc
            };

            for (const [key, value] of Object.entries(ratios)) {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${key}</td><td>${value}</td>`;
                valuationBody.appendChild(row);
            }

            document.getElementById("financialRatios").style.display = "table";
        })
        .catch(err => {
            console.error("Hata:", err);
            alert("Veri çekme sırasında bir hata oluştu. API key ve sembolü kontrol edin.");
        });
}

// Başlangıçta yükle
loadTradingViewWidget(symbol);
loadFinancialRatios(symbol);

// Form submit olduğunda güncelle
document.getElementById("symbolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    symbol = document.getElementById("symbolInput").value;
    loadTradingViewWidget(symbol);
    loadFinancialRatios(symbol);
});
