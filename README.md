# Web Cashier

Project membuat web pemesanan yang saya beri nama Web Cashier yang sedikit lebih disempurnakan secara tampilan maupun fungsinya dari project [html dan css] Project ini dipermisalkan sebagai alat untuk transaksi panjualan di kedai Coffee yang terhubung dengan database REST API atau terintegrasi dengan backend. Materi presentasi klik [disini]

## Test Deploy

- Silahkan kunjungi link berikut ini [lambancoffee]. 
- Pastikan teman-teman untuk melakukan registrasi terlebih dahulu pilih menjadi admin atau cashier.
- Jika sudah melakukan registrasi, silahkan login menggunakan email dan password yang didaftarkan.
- Jika kamu memilih menjadi admin maka kamu akan memperoleh hak akses terbatas.
- Jika kamu memilih menjadi cashier maka kamu akan memperoleh hak akses penuh.

## Rule Access

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body>
 
 <table>
 	<tr>
 		<th>User</th>
    <th>Code Access</th>
    <th>Cart</th>
    <th>Checkout</th>
    <th>Create Product</th>
    <th>Detail Product</th>
    <th>Update Product</th>
    <th>Delete Product</th>
    <th>Detail History</th>
    <th>Delete History</th>
 	</tr>
 	<tr>
 		<td> Admin </td>
 		<td> 0 </td>
    <td> &radic; </td>
    <td> &otimes; </td>
    <td> &radic; </td>
    <td> &otimes; </td>
    <td> &otimes; </td>
    <td> &otimes; </td>
    <td> &otimes; </td>
    <td> &otimes; </td>
 	</tr>
  <tr>
 		<td> Cashier </td>
 		<td> 1 </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
    <td> &radic; </td>
 	</tr>
 </table>
</body>
</html>

---

## Install Library

Project ini menggunakan beberapa freamwork silahkan install didalam kode editor seperti VS Code atau sejenisnya:

### [Vuex]
```
# With npm
npm install vuex
```
### [Axios]
```
# With npm
npm install axios
```
### [bootstrap vue]
```
# With npm
npm install bootstrap-vue
```

### [sweetalert2]
```
# With npm
npm install sweetalert2
```

### Kemudian silahkan register BootstrapVue ke dalam entri point app (app.js atau main.js).
```
import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
```

---

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---

[lambancoffee]: http://52.204.186.223:5000/
[html dan css]: https://github.com/tomimandalap/deliveryfastfood
[b-frontend]: https://github.com/tomimandalap/bfrontend
[beginner-backend]: https://github.com/tomimandalap/beginer_backend
[Vuex]: https://www.npmjs.com/package/vuex
[bootstrap vue]: https://bootstrap-vue.org/docs
[axios]: https://www.npmjs.com/package/axios
[sweetalert2]: https://www.npmjs.com/package/sweetalert2
[disini]: https://www.canva.com/design/DAEVd2y6pKM/y1PdfaRnK-j5hYVLSZxx2Q/view?utm_content=DAEVd2y6pKM&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton

## Design

### Extra-Lg
![web-10](https://user-images.githubusercontent.com/43200304/107141092-247b5380-6959-11eb-9cbb-95dd5c24d5cb.PNG)

---

### Responsive
![All device](https://user-images.githubusercontent.com/43200304/107140975-6ce64180-6958-11eb-9dd8-f1d0a422f43f.png)

---

### Repositori Backend
Silahkan kunjungi link berikut ini [beginner-backend]
