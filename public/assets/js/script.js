function activeMenuItem() {
    let current = document.location.pathname.split("/");
    let items = document.getElementsByClassName("item");

    current = current[current.length - 1];

    for (let i = 0; i < items.length; i++) {
        let item = items[i].innerHTML;
        if (item.includes(current)) {
            items[i].classList.add("active")
        }
    }
}
document.addEventListener("DOMContentLoaded", activeMenuItem);

//to-do

$(function() {
    var $todo = $('#todo');
    var $todos = $('.todos');
    var $AddBtn = $('.add button');
    var $val = $('.add input');
    var $item = $('.item');
    var $items = localStorage.getItem('todos');
    if ($items) {
        if ($items.length > 8) {
            $todos.html($items)
        } else {
            $todos.html("<div class='f item'>Add some todos!</div>");
        }
    } else {
        $todos.html("<div class='f item'>Add some todos!</div>");
    }
    $val.on('keypress', function(e) {
        var el = $val.val();
        if (e.which == 13 && el.length > 0) {
            $todos.prepend("<div class='item'><span>" + el + "</span><i class=\"delete fa fa-trash\"></i></div>");
            $val.val('');
            localStorage.setItem('todos', $todos.html());
        }
    })
    $AddBtn.on('click', function(e) {
        var el = $val.val();
        var first = $todos.find('.f');
        if (first) {
            first.remove();
        }
        if (el.length > 0) {
            $todos.prepend("<div class='item'><span>" + el + "</span><i class=\"delete fa fa-trash\"></i></div>");
            $val.val('');
            localStorage.setItem('todos', $todos.html());
        } else {
            $todo.toggleClass('shake');
        }

    })
    $todo.on("click", "i.delete", function() {
        var that = $(this).closest('.item');
        TweenMax.to(that, 0.5, {
            height: "0px",
            left: "100px",
            opacity: "0",
            onComplete: deleted
        })

        function deleted() {
            $(this).closest('div').remove();
            localStorage.setItem('todos', $todos.html());
        }
    })
    $todo.on('click', 'span', function() {
        $(this).toggleClass('done');
        localStorage.setItem('todos', $todos.html());
    })
})