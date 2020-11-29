$(document).ready(() => {
    area.forEach((value, index) => {
        $( ".list-area" ).append(`<li class="area-item">
            <a href='/search/${value}' class="search-item">
                <span class='title'>${value}</span>
            </a>
        </li>`);
    })
})
