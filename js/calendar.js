var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var today_day = new Date().getDate()
var today_month = new Date().getMonth() + 1
var today_year = new Date().getFullYear()
var month = new Date().getMonth() + 1
var year = new Date().getFullYear()
function verif(index){
	day = new Date(year, month, 1).getDay()
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
	// text_fields_modal.style.display = 'none'
	// send_message_modal.style.display = 'none'
	month_year.innerHTML = months[month]+' / '+year
	counter = 0
	for(row=0; row < 6; row++){
		tr = document.createElement('tr')
		calendar.appendChild(tr)
		for(col=0; col<7; col++){
			td = document.createElement('td')
			function verif_pass(){
				if(year < today_year ||
					year == today_year && month < today_month ||
					year == today_year && month == today_month && new Date(year, month, 1).getDay() == 0 && counter < today_day + 6 ||
					year == today_year && month == today_month && new Date(year, month, 1).getDay() != 0 && counter < today_day - 1 + new Date(year, month, 1).getDay()){
					return true
				}else{
					return false
				}
			}
			if(verif_pass()){
				td.className = 'day_calendar_pass'
			}
			else{
				td.className = 'day_calendar'
				td.onclick = (argument) => {
					active_day = document.getElementsByClassName('day_calendar_active')
					for (i = active_day.length - 1; i >= 0 ; i--){
						if(verif_pass()){
							active_day[i].className = 'day_calendar_pass'
						}else{
							active_day[i].className = 'day_calendar'
						}
					}
					choose_time.style.display = 'block'
					argument.toElement.className = 'day_calendar_active'
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
	update()
}
function next_month_calendar(){
	month += 1
	if (month == 12){
		month = 0
		year += 1
	}
	update()
}
update()