$(function () {
    var login = sessionStorage.getItem('login');

    if (login == null) {
        alert('Faça login!')
        window.location.replace("/frontend/html/registro_login/index.html");
    }
    // logout
    $(document).on("click", ".logout", function () {
        sessionStorage.removeItem('login');
        sessionStorage.removeItem('jwt');
        window.location = '/frontend/html/index.html';
    });

});
