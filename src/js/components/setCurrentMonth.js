export const setCurrentMonth = element => {
    if (!element) return;

    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];

    element.textContent = currentMonth;
};
