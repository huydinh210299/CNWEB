$(document).ready(() => {
    area.forEach((value, index) => {
        $( ".list-area" ).append(`<li class="area-item" data='${value}'>
            <button class="search-item area-item" style="border: none; background-color: unset; pointer-event:none;">
                <span class='title'>${value}</span>
            </button>
        </li>`);
    })
})
