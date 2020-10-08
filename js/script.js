document.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(item = 0) {
        tabsContent[item].classList.add('show', 'fade');
        tabsContent[item].classList.remove('hide');
        tabs[item].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer
    const deadline = '2020-10-05';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            let t;
            if (Date.parse(endtime) >= Date.parse(new Date()))
                t = getTimeRemaining(endtime);
            else t = getTimeRemaining(new Date());

            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        function addZero(number) {
            return (number < 10) ? '0' + number : number;
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalBtns = document.querySelectorAll('[data-modal]'),
        modalWnd = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    modalBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            // console.log('click');
            // modalWnd.classList.add('show');
            // modalWnd.classList.remove('hide');
            modalWnd.classList.toggle('show');
            document.body.style.overflow = 'hidden';

        });

    });

    function closeModal(){
            modalWnd.classList.toggle('show');
            document.body.style.overflow = '';
    }

    modalWnd.addEventListener('click', (evt) => {
        // console.log(evt.target);
        if (evt.target === modalWnd) {
            closeModal();
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown',(e) => {
        if(e.code === 'Escape' && modalWnd.classList.contains('show')){
            closeModal();
        }
    })

});