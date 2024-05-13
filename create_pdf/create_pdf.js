"use strict"

const PDFDoc = require("pdfkit");//импорт модулей pdfkit
const fs = require("fs");

const doc = new PDFDoc();// Создаем новый документ PDF

doc.fillColor('#800000').font('./Null-Normal.ttf').fontSize(40).text('Анкета на Дайвинчик', 70, 30,{bold: true});

doc.fillColor('#8B0000').font('./Swampy Dirt.ttf').fontSize(85).text('yXkai', 320, 180,{bold: true});

doc.lineWidth(15).rect(20, 100, 225, 300).stroke();

doc.image('./IMG_5165.jpg', 20 + 15 / 2, 100 + 15 / 2, { width: 225 - 15, height: 300 - 15 });

doc.fillColor('black').fontSize(18)
   .text('Name: Kaden Millioner', 190, 280,{align: 'center'})
   .text('Email: finksosal@example.com', 250, 305,{align: 'center'})
   .text('Phone: +14 886 9420 911', 200, 330,{align: 'center'});

doc.fillColor('black').fontSize(20).text('Привет, я ваш любимый криптоинвестор, и сегодня какая то шлюшка говорила о своих планах и мечтах, а я думал лишь о её чики пики, дупси дупси.', 50, 430);

doc.fillColor('#8B0000').font('./Null-Normal.ttf').fontSize(25).text('Прыгай в трусики малышка', 50, 530,{align: 'center',bold: true});


doc.link(100, 590, 32, 32,'https://music.yandex.ru/artist/15934600').image('./YML.png', 100, 590,{ width: 32, height: 32 });
doc.link(220, 590, 32, 32,'https://vk.com/yxkkai').image('./VKL.png', 220, 590,{ width: 32, height: 32 });
doc.link(340, 590, 32, 32,'https://t.me/yxkkai').image('./TGL.png', 340, 590,{ width: 32, height: 32 });
doc.link(450, 590, 40, 32,'https://www.youtube.com/@yxxcast/videos').image('./YTL.jpg', 450, 590,{ width: 40, height: 32 });

doc.pipe(fs.createWriteStream("KaidenInfo.pdf"));//сохранение файла

doc.end();
