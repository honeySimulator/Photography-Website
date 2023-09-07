// $(document).ready(function() {
//   $('#registration-form').submit(function(event) {
//     event.preventDefault(); // остановить отправку формы по умолчанию
//     var username = $('#username').val();
//     var password = $('#password').val();
//     var requestData = { username: username, password: password };
//     $.ajax({
//       url: '/user/register',
//       type: 'POST',
//       contentType: 'application/json',
//       data: JSON.stringify(requestData),
//       success: function(data) {
//         console.log(data); // обработка успешного ответа от сервера
//       },
//       error: function(xhr, textStatus, errorThrown) {
//         console.error(errorThrown); // обработка ошибки
//       }
//     });
//   });
// });
