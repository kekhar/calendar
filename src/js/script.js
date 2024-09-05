// Функция для расчета дней до лета
document.addEventListener('DOMContentLoaded', () => {
	const countdownElement = document.getElementById('countdown');
	if (countdownElement) {
	  const today = new Date();
	  const summerStart = new Date(today.getFullYear(), 5, 1);
	  if (today > summerStart) {
	    summerStart.setFullYear(summerStart.getFullYear() + 1);
	  }
	  const daysUntilSummer = Math.ceil((summerStart - today) / (1000 * 60 * 60 * 24));
	  countdownElement.textContent = `До лета осталось ${daysUntilSummer} дней`;
	}
   });
   
   // Функция для получения праздников через Calendarific API
   async function getHolidays(year, country) {
	const apiKey = 'G4Qz3a5L3hr2r6PHwwMTduF5x3T0zYz0'; // Мой ключ API
	const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
	try {
	  const response = await fetch(url);
	  const data = await response.json();
	  return data.response.holidays.map(holiday => new Date(holiday.date.iso));
	} catch (error) {
	  console.error("Ошибка при получении данных о праздниках:", error);
	  return [];
	}
   }
   
   // Функция для расчета рабочих дней до лета от выбранной даты
   async function calculateWorkingDaysToSummer() {
	const startDate = new Date(document.getElementById('startDate').value);
	const summerStart = new Date(startDate.getFullYear(), 5, 1);
   
	if (startDate > summerStart) {
	  summerStart.setFullYear(summerStart.getFullYear() + 1);
	}
   
	let workingDays = 0;
	const holidays = await getHolidays(startDate.getFullYear(), 'RU');
   
	for (let date = new Date(startDate); date < summerStart; date.setDate(date.getDate() + 1)) {
	  const day = date.getDay();
	  const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
   
	  if (day !== 0 && day !== 6 && !isHoliday) {
	    workingDays++;
	  }	
	}
   
	const resultElement = document.getElementById('result');
	resultElement.textContent = `От выбранной даты до лета ${workingDays} рабочих дней.`;
   }
   