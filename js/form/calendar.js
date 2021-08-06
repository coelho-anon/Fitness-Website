var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = undefined
var month = new Date().getMonth()
var year = new Date().getFullYear()
// this is the variable that will pass to the form
var Date_Form = undefined
function verif(index){
	var day = new Date(year, month, 1).getDay()
	// if the first day is sunday
	if (day == 0){
		return new Date(year, month, index - 6).getDate()
	}else{
		return new Date(year, month, index + 1 - day).getDate()
	}
}

function clear(){
	for (i = calendar.childNodes.length-1; i > 1; i--){
		calendar.removeChild(calendar.childNodes[i])
	}
}
function update(){
	clear()
	choose_time.style.display = 'none'
	text_fields_modal.style.display = 'none'
	send_message_modal.style.display = 'none'
	month_year.innerHTML = months[month]+' / '+year
	counter = 0
	for(row=0; row < 6; row++){
		tr = document.createElement('tr')
		calendar.appendChild(tr)
		for(col=0; col<7; col++){
			td = document.createElement('td')
			td.counter = counter
			function verif_pass(counter){
				if(year < new Date().getFullYear() ||
					year == new Date().getFullYear() && month < new Date().getMonth() ||
					year == new Date().getFullYear() && month == new Date().getMonth() && new Date(year, month, 1).getDay() == 0 && counter < new Date().getDate() + 6 ||
					year == new Date().getFullYear() && month == new Date().getMonth() && new Date(year, month, 1).getDay() != 0 && counter < new Date().getDate() - 1 + new Date(year, month, 1).getDay() ||
					verif(counter) >= 23 && counter <= 6 ||
					verif(counter) <= 15 && counter > 27){
					return true
				}else{
					return false
				}
			}
			if(verif_pass(counter)){
				td.className = 'day_calendar_pass'
			}
			else{
				td.className = 'day_calendar'
				td.onclick = (argument) => {
					active_day = document.getElementsByClassName('day_calendar_active')
					day = argument.toElement.innerText
					for (i = active_day.length - 1; i >= 0 ; i--){
						if(verif_pass(argument.toElement.counter)){
							active_day[i].className = 'day_calendar_pass'
						}else{
							active_day[i].className = 'day_calendar'
						}
					}
					function convert_num_date(num){
						if(String(num).length == 1){
							return '0' + String(num)
						}
						else{
							return num
						}
					}
					Date_Form = year + '/' + convert_num_date(month + 1) + '/' + convert_num_date(day)
					$("#choose_time").fadeIn(1000);
					$("#text_fields_modal").fadeIn(1500);
					$("#send_message_modal").fadeIn(2000);
					argument.toElement.className = 'day_calendar_active'
					console.log(Date_Form)
				}
			}
			td.innerHTML= verif(counter)
			tr.appendChild(td)
			counter += 1
		}
	}
}
function prev_month_calendar(){
	month -= 1
	if (month == -1){
		month = 11
		year -= 1
	}
	day = undefined
	update()
}
function next_month_calendar(){
	month += 1
	if (month == 12){
		month = 0
		year += 1
	}
	day = undefined
	update()
}
update()