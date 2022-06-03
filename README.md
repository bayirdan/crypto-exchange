# Crypto ₿ Exchange
---

Crypto Exchange, MERN ile CoinCap API kullanılarak 2000 tane coin ve tokenin anlık fiyatlarını gösteren, temsili olarak alım ve satım yapılabilen, bakiye ekleme ve çekme özellikli bir uygulamadır. 

Kayıt olmadan anlık coin ve tokenlerin fiyatlarını görebilir, kayıt olarak da bu coin ve tokenlerin yatırımını yapabilirsiniz. Temsili olarak her coin ve tokenden alıp, satabilirsiniz. Dilerseniz bakiye (USD) yükleyebilir veya olan bakiyenizi çekebilirsiniz.

Uygulamada anlık fiyatları görme haricindeki her eylem, uygulamaya giriş gerektirmektedir. Her adım, bu uygulama için ayarlı 30 günlük JSON Web Token ile korunmakta olup, uygulamaya giriş sonrası tekrardan giriş yapılması istenmez.

Uygulamaya kayıt olurken kullanılan password `bcryptjs` ile şifrelenmektedir.

Oluşturulan her user'de email unique olduğu için aynı email ile kayıt izni verilmez.

[Demo](https://bayirdan-crypto-exchange.herokuapp.com/)

---

## Kullanım

Root klasöründe bir `.env` dosyası oluşturup kendi PORT, MONGO_URI ve JSW_SECRET değerlerinizi girin.

```
PORT = your port
MONGO_URI = your mongo_uri
JWT_SECRET = your secret key
```

## Yükleme

Backend için:

```
npm install
```

Frontend için:

```
cd frontend
npm install
```

## Server ve Client Çalıştırma

```
npm run server
npm run client
```

---

### MIT License

Copyright (c) 2022 Burkay

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

