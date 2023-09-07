// function handleLogin(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//
//     if (username === 'myusername' && password === '1234') {
//         localStorage.setItem('loggedIn', true);
//         localStorage.setItem('username', username);
//         document.getElementById('login-form').style.display = 'none';
//         document.getElementById('login-status').innerHTML = `Logged in as ${username} <button onclick="handleLogout()">Выйти</button><button onclick="goToCart()">Корзина</button>`;
//     } else if (username === 'admin' && password === 'admin') {
//         localStorage.setItem('loggedIn', true);
//         localStorage.setItem('username', username);
//         document.getElementById('login-form').style.display = 'none';
//         document.getElementById('login-status').innerHTML = `Logged in as ${username} <button onclick="handleLogout()">Выйти</button><button onclick="goToOrders()">Администрирование заказов</button>`;
//     } else {
//         document.getElementById('login-status').innerHTML = 'Incorrect username or password';
//     }
//
//     return false;
// }
//
// function handleLogout() {
//     localStorage.removeItem('loggedIn');
//     localStorage.removeItem('username');
//     document.getElementById('login-form').style.display = 'block';
//     document.getElementById('login-status').innerHTML = '';
// }
//
// function goToCart() {
//     // localStorage.setItem('cartVisited', true);
//     window.location.href = '/cart';
// }
//
// function goToOrders() {
//     // localStorage.setItem('ordersVisited', true);
//     window.location.href = '/orders';
// }
//
// // на странице cart.html
// window.onload = function() {
//     if (localStorage.getItem('loggedIn') === 'true') {
//         document.getElementById('login-form').style.display = 'none';
//         document.getElementById('login-status').innerHTML = `Logged in as ${localStorage.getItem('username')} <button onclick="handleLogout()">Log out</button>`;
//     }
//     // if (localStorage.getItem('cartVisited') === 'true') {
//     //     localStorage.removeItem('cartVisited');
//         // код для отображения содержимого корзины
//     // }
// }
// //
// // // на странице orders.html
// // window.onload = function() {
// //     if (localStorage.getItem('loggedIn') === 'true') {
// //         document.getElementById('login-form').style.display = 'none';
// //         document.getElementById('login-status').innerHTML = `Logged in as ${localStorage.getItem('username')} <button onclick="handleLogout()">Log out</button>`;
// //     }
// //     if (localStorage.getItem('ordersVisited') === 'true') {
// //         localStorage.removeItem('ordersVisited');
// //         // код для отображения списка заказов
// //     }
// // }
