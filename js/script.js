document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

          function hideTabContent() {
              tabsContent.forEach(item => {
                // item.style.display = 'none';
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
              });

              tabs.forEach(item =>{
                item.classList.remove('tabheader__item_active');
              });
          }

          function showTabContent(item = 0) {
            tabsContent[item].classList.add('show','fade');
            tabsContent[item].classList.remove('hide');
              tabs[item].classList.add('tabheader__item_active');
          }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if(target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});