function includeHTML() {
    const z = document.querySelectorAll(['[include]'])
    for (let i = 0; i < z.length; i++) {
        const elmnt = z[i]
        const file = elmnt.getAttribute('include')
        const xhttp = new XMLHttpRequest()
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    elmnt.innerHTML = this.responseText
                }
                if (this.status == 404) {
                    elmnt.innerHTML = 'Page not found.'
                }

                elmnt.removeAttribute('include')
                includeHTML()
            }
        }
        xhttp.open('GET', file, true)
        xhttp.send()

        return
    }
}
includeHTML()

$(function () {
    $('body').on('show.bs.collapse', '#main-menu', function () {
        $('body').addClass('menu-opening overlay')
    }).on('shown.bs.collapse', function () {
        $('body').addClass('menu-open').removeClass('menu-opening')
    }).on('hide.bs.collapse', function () {
        $('body').addClass('menu-closing').removeClass('menu-open')
    }).on('hidden.bs.collapse', function () {
        $('body').removeClass('menu-open overlay menu-closing')
    })
    const colorLegend = $('<div id="circle-legend" />')

    $('body').append(colorLegend)

    $('#circle .item').on('mousemove', function (event) {
        colorLegend.text($(this).text())

        const left = $(this).data('direct') == 'left' ? (event.pageX + 10) : event.pageX - colorLegend.innerWidth()
        colorLegend.css({
            'background': $(this).data('color'),
            display: 'flex',
            top: event.pageY,
            left: left
        })
    }).on('mouseleave', function () {
        colorLegend.hide()
    })
})