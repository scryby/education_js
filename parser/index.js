const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

//AXIOS - для отправки GET запросов на сайт
//CHEERIO - парсинг

async function getPriceFeed(){
    try { // обработка ошибок
        const siteURL = "https://coinmarketcap.com/";


        //извлечение свойства data от полученного запроса
        const { data } = await axios({//await - оператор, который ожидает выполнения асинхронной операции || axios - модуль для отправки запросов
            mehod: "GET",
            url: siteURL,
        });

        // Cheerio для загрузки HTML-кода страницы
        const $ = cheerio.load(data); 

        const elemSelector = "#__next > div.sc-e742802a-1.fprqKh.global-layout-v2 > div.main-content > div.cmc-body-wrapper > div > div:nth-child(1) > div.sc-14cb040a-2.hptPYH > table > tbody > tr";
        
        //массив ключей для информации о валютах
        const keys = [
            "rank",
            "name",
            "price",
            "1h",
            "24h",
            "7d",
            "marketCap",
            "volume",
            "circulatingSupply",
          ];

          //массив для полученной информации
          const coinArr = [];

        // $(elemSelector) - это выборка из селектора
        // .each - метод Cheerio, бегает по всем элементам

          $(elemSelector).each((parentIdx, paramElem) => {

            let keyIdx = 0;// отслеживания текущего индекса ключа в keys
            let coinObj = {};// маасив для сбора информации по монете
            
            // для инфы о 10 криптовалют
            if (parentIdx < 10){
                
                //$(paramElem).children() - это выборка всех дочерних элементов текущего элемента paramElem.
                // .each - метод Cheerio, бегает по всем элементам
                $(paramElem).children().each(
                    (childIdx, childElem) => {
                    
                    let tdValue = $(childElem).text(); //$(childElem).text() - извлекает текстовое содержимое текущего дочернего элемента childElem.

                    if(keyIdx === 1 || keyIdx === 7){

                         //$(childElem).html() -   Выбирает HTML дочернего элемента
                         // Использует jQuery-подобный синтаксис для поиска первого дочернего элемента <p> в HTML-содержимом текущего элемента childElem.
                        tdValue = $(`p:first-child`, $(childElem).html()).text();

                    }

                    if(tdValue){

                        coinObj[keys[keyIdx]] = tdValue;
                        keyIdx++;

                    }

                });
                coinArr.push(coinObj);
            } 
          });

          return coinArr;


    }catch(err){
        console.error(err);
    }
}


const app = express();

//обработчик для HTTP-запросов типа GET
app.get("/api/price-feed", async(req,res) => {

    try{
        const priceFeed = await getPriceFeed();

        return res.status(200).json({
            result: priceFeed,
        });
    } catch (err) {
        return res.status(500).json({
            err: err.toString(),  // возврат ошибки в виде строки
        });
    }
});


// запуск по порту 3000
app.listen(3000, () => {
    console.log("Running on port 3000");
  });
  
