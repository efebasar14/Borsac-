const FINNHUB_API_KEY = "d47kcq9r01qkdqhr49o0d47kcq9r01qkdqhr49og"; // sadece test için

function loadFinancialRatios(symbol) {
    let finnhubSymbol = symbol.replace("BIST:", "") + ".IS";

    fetch(`https://finnhub.io/api/v1/quote?symbol=${finnhubSymbol}&token=${FINNHUB_API_KEY}`)
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
