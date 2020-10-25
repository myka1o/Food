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
        btn.addEventListener('click', showModal);

    });

    modalWnd.addEventListener('click', (evt) => {
        // console.log(evt.target);
        if (evt.target === modalWnd) {
            closeModal();
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWnd.classList.contains('show')) {
            closeModal();
        }
    });

    function showModal() {
        modalWnd.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalWnd.classList.toggle('show');
        document.body.style.overflow = '';
    }

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            showModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }
    //Modal force

    // const modalTimerId = setTimeout( showModal, '5000');

    window.addEventListener('scroll', showModalByScroll);

    //Use classes for cards

    class MenuCard{
        constructor(src, alt, title, descr, price, parentSelector){
            this.src = src;
            this.alt = alt;title
            this.title = title;
            this.parent = document.querySelector(parentSelector);
            this.descr = descr;price
            this.price = price;
            this.transfer = 77;
            this.change2Rub();
        }

        change2Rub(){
            this.price  = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div'); 
            element.innerHTML = `
            <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
            console.log('Hello');            
        }
    }

    new MenuCard(   'img/tabs/vegy.jpg',
                    'vegy',
                    'Меню "Фитнес"',
                    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                    7,
                    '.menu .container').render();
    
    new MenuCard(   'img/tabs/elite.jpg',
                    'elite',
                    'Меню “Премиум”',
                    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                    8,
                    '.menu .container').render();

    new MenuCard(   'img/tabs/post.jpg',
                    'post',
                    'Меню "Постное"',
                    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                    5,
                    '.menu .container').render();
});