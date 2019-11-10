let $parent = document.querySelector('#parent')

$parent.addEventListener('click', (e) => {
    console.log(e.target.getAttribute('data-name'))
})