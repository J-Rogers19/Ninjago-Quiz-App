function shoppingList() {
  
  
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    
    let listItem = $('.js-shopping-list-entry').val();
    
    
   
      $('.shopping-list').append(`<li>
        <span class="shopping-item">${listItem}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`);
     
});


$('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
  $(this).closest('.shopping-item-controls').siblings('.shopping-item').toggleClass('shopping-item__checked');
});



$('.shopping-list').on('click', '.shopping-item-delete', function(event) {
  $(this).closest('li').remove();
});
}
 



$(shoppingList);

