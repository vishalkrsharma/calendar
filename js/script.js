const date = new Date();

let count = 0;

const renderEvent = () => {
    const openEventBtn = document.querySelectorAll('[data-event-target]');
    const closeEventBtn = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    
    openEventBtn.forEach(button => {
        button.addEventListener('click', () => {
            const event = document.querySelector(button.dataset.eventTarget);
            openEvent(event);
        });
    });
    
    closeEventBtn.forEach(button => {
        button.addEventListener('click', () => {
            const event = button.closest('.event');
            closeEvent(event);
        });
    });
    
    function openEvent (event) {
        if(event == null) {
            return;
        }
        event.classList.add('active');
        overlay.classList.add('active');
    }
    
    function closeEvent (event) {
        if(event == null) {
            return;
        }
        event.classList.remove('active');
        overlay.classList.remove('active');
    }
};

const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    document.querySelector('.date h1').innerHTML = months[date.getMonth()];

    document.querySelector('.date p button').innerHTML = new Date().toDateString();

    let days = "";

    for(let x=firstDayIndex; x>0; x--){
        days += `<button class="prev-date">${prevLastDay - x +1}</button>`;
    }

    for(let i=1;i<=lastDay;i++) {
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
            days += `<button class="today" data-event-target="#event">${i}</button>`;
        } else {
            days += `<button data-event-target="#event">${i}</button>`;
        }
    }

    for(let j=1; j<=nextDays; j++) {
        days+=`<button class="next-date">${j}</button>`;
        monthDays.innerHTML = days;
    }
};

document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    count--;
    renderCalendar();
    renderEvent();
});

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    count++;
    renderCalendar();
    renderEvent();
});


document.querySelector('button').addEventListener('click', () => {
    date.setMonth(date.getMonth() - count);
    count=0;
    renderCalendar();
    renderEvent();
});

renderCalendar();

renderEvent();





