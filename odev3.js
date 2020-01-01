var fs = require('fs');

var data = fs.readFileSync('input.txt', 'utf8');

data = data.toString().split("\r\n");

for (i = 0; i < data.length; i++) {
    data[i] = data[i].split(",")
}

var netHesabi = [];

for (i = 2; i < data.length; i++) {
    var ogrNO = data[i][0];
    var puan = 0;
    netHesabi.push({
        ogrNO,
        puan
    })
}

for (i = 2; i < data.length; i++) {
    for (j = 0; j < data[0]; j++) {
        if (data[i][j + 1] === data[1][j]) {
            netHesabi[i - 2]["puan"] += 4
        } else if (data[i][j + 1] === "") {

        } else {
            netHesabi[i - 2]["puan"] -= 1
        }
    }
}

function kabarcikSiralamaFonksiyonu(dizi) {
    var yeniDizi = dizi;
    var n = yeniDizi.length;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++)
            //Dizimizdeki öğrencilerin puan indisine göre sıralanmasını sağlıyoruz
            if (yeniDizi[j]["puan"] < yeniDizi[j + 1]["puan"]) {
                var temp = yeniDizi[j];
                yeniDizi[j] = yeniDizi[j + 1];
                yeniDizi[j + 1] = temp;
            }
    }
    return yeniDizi;
}
var dizi = kabarcikSiralamaFonksiyonu(netHesabi)
var yazilacak = ""

for (i = 0; i < netHesabi.length; i++) {
    yazilacak += netHesabi[i]["ogrNO"] + "," + netHesabi[i]["puan"] + "\n"
}

function veriler(dizi) {
    var veriler = []
    var toplam = 0
    for (i = 0; i < dizi.length; i++) {
        toplam += dizi[i]["puan"]
    }
    var ortalama = toplam / dizi.length
    var medyan = 0
    if (veriler.length % 2 == 0) {
        var yer1 = dizi.length / 2 - 1
        var yer2 = (dizi.length / 2)
        medyan = (dizi[yer1]["puan"] + dizi[yer2]["puan"]) / 2
    } else {
        var yer = (veriler.length + 1) / 2
        medyan = dizi[yer]["puan"]
    }
    veriler.push(ortalama)
    veriler.push(medyan)
    return veriler
}
var ortalamavemedyan = veriler(netHesabi)
//En yüksek puanı ekliyoruz
yazilacak += dizi[0]["puan"] + ",";
//En düşük puanı ekliyoruz
yazilacak += dizi[dizi.length - 1]["puan"] + ",";
yazilacak += ortalamavemedyan[0] + ",";

yazilacak += ortalamavemedyan[1] + ",";

yazilacak += (dizi[0]["puan"] - dizi[dizi.length - 1]["puan"]);
fs = require('fs');
fs.writeFile('output.txt', yazilacak, function (err) {

});
//https://stackoverflow.com/questions/45309447/calculating-median-javascript
//http://bilgisayarkavramlari.sadievrenseker.com/2008/08/09/kabarcik-siralamasi-baloncuk-siralamasi-bubble-sort/
//https://www.yazilimkodlama.com/web/javascript-not-hesaplama/
//https://developer.mozilla.org/tr/docs/Web/JavaScript/Guide/Loops_and_iteration