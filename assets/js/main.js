$(document).ready(function () {
    let icons = ["lunch_dining", "egg", "takeout_dining", "egg_alt", "local_pizza", "emoji_food_beverage", "icecream", "cake", "bakery_dining", "liquor", "local_cafe", "local_bar", "ramen_dining", "kebab_dining"];
    let iconsObj = {
        lunch_dining: "ბურგერი",
        egg: "კვერცხი",
        takeout_dining: "ატრია",
        egg_alt: "შემწვარი კვერცხი",
        local_pizza: "პიცა",
        emoji_food_beverage: "ჩაი",
        icecream: "ნაყინი",
        cake: "ტორტი",
        bakery_dining: "კრუასანი",
        liquor: "ლიქიორი",
        local_cafe: "ყავა",
        local_bar: "მარტინი",
        ramen_dining: "მაკარონი",
        kebab_dining: "მწვადი"
    }

    let target = Math.floor((Math.random() * icons.length) + 1) - 1;

    $('body').prepend('<div class="intro"><h1>იპოვე ' + iconsObj[icons[target]] + '</h1></div>');
    $('.intro').fadeOut(2000);

    // Stopwatch
    let sec = 0;
    setInterval(updateDisplay, 1000);

    function updateDisplay() {
        sec++;
    }

    let targetX;
    let targetY;

    let space = 50;

    let forX;
    let forY;

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    for (let i = 0; i < icons.length; i++) {



        forX = randomIntFromInterval(50, ($(window).width() - 50))
        forY = randomIntFromInterval(50, ($(window).height() - 50))

        $('body').prepend(`
        <div class="${target == i ? "target" : "targets"}" style="left: ${forX}px; top: ${forY}px">
            <span class="material-symbols-outlined">${icons[i]}</span>
        </div>
        `)

        if (target == i) {
            targetX = forX;
            targetY = forY;
        }

    }

    let mouse = { x: 0, y: 0 }
    $(document).mousemove(function (e) {
        mouse.x = e.pageX
        mouse.y = e.pageY

        $('.circle').css('top', (mouse.y - 50) + 'px');
        $('.circle').css('left', (mouse.x - 50) + 'px');

    })

    $(document).on('click', function () {
        console.log(forY, forX)
        console.log(mouse.y, mouse.x)

        // winning
        if (((targetX - mouse.x) > -space && (targetX - mouse.x) < space) && ((targetY - mouse.y) > -space && (targetY - mouse.y) < space)) {

            $('body').append(`
            <div class="results">
                <h1>გილოცავ! შენი რეკორდია ${sec} წამი.</h1>
                <button class="reload btn btn-dark mt-5">თავიდან</button>
            </div>
            `)
        }

        $('.reload').on('click', function () {
            location.reload();
        })

    })

    //
    var isNS = (navigator.appName == "Netscape") ? 1 : 0;

    if (navigator.appName == "Netscape") document.captureEvents(Event.MOUSEDOWN || Event.MOUSEUP);

    function mischandler() {
        return false;
    }

    function mousehandler(e) {
        var myevent = (isNS) ? e : event;
        var eventbutton = (isNS) ? myevent.which : myevent.button;
        if ((eventbutton == 2) || (eventbutton == 3)) return false;
    }
    document.oncontextmenu = mischandler;
    document.onmousedown = mousehandler;
    document.onmouseup = mousehandler;
    var isCtrl = false;
    document.onkeyup = function (e) {
        if (e.which == 17)
            isCtrl = false;
    }

    document.onkeydown = function (e) {
        if (e.which == 17)
            isCtrl = true;
        if (((e.which == 85) || (e.which == 117) || (e.which == 65) || (e.which == 97) || (e.which == 67) || (e.which == 99)) && isCtrl == true) {
            // alert(‘Keyboard shortcuts are cool!’);
            return false;
        }
    }

})