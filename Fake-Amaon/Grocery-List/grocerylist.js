$(function () {
    // Function to save cart data to localStorage
    function saveCart() {
        const cartItems = [];
        $('#have-list li').each(function () {
            const itemName = $(this).text().replace('remove', '').trim();
            cartItems.push(itemName);
        });
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // Function to load cart data from localStorage
    function loadCart() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        $('#have-list').empty();
        cartItems.forEach(function (item) {
            const listItem = $(
                `<li><input type="checkbox" name="item" checked> ${item} <a href="#">remove</a></li>`
            );
            $('#have-list').append(listItem);
        });
    }

    // Initialize cart from localStorage
    loadCart();

    // Event handler for "Add to cart"
    $('.box-content').on('click', '.add-to-cart', function () {
        const itemName = $(this).data('item'); // Get the item's name
        const item = $(
            `<li><input type="checkbox" name="item" checked> ${itemName} <a href="#">remove</a></li>`
        );

        $('#have-list').append(item); // Add to "Have" list
        saveCart(); // Save the updated cart
    });

    // Remove items
    $('ul').on('click', 'li a', function (event) {
        $(event.target).parent('li').remove();
        saveCart(); // Save the updated cart
    });

    // Toggle items between lists
    $('ul').on('click', 'input[type=checkbox]', function (event) {
        const listItem = $(event.target).parent('li');
        const list = event.target.checked ? $('#have-list') : $('#need-list');
        listItem.appendTo(list);
        saveCart(); // Save the updated cart
    });
});