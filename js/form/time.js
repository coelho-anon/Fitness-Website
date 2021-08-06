var Time_Form = undefined
function Save_Time(){
	Time_Form = hour_clock.value +':'+minute_clock.value
	console.log(Time_Form)
}
function add_or_subtract_time(add, type_of_time, input, value){
	if(type_of_time == 'Minutes'){
		if(add){
			num = Number(input.value) + value
			if(num >= 60){
				num -= 60
			}
		}else{
			num = Number(input.value) - value
			if(num < 0){
				num += 60
			}
		}
	}else{
		if(add){
			num = Number(input.value) + value
			if(num >= 24){
				num -= 24
			}
		}else{
			num = Number(input.value) - value
			if(num < 0){
				num += 24
			}
		}
	}
	if(String(num).length == 1){
		num = '0' + String(num)
	}
	input.value = num
	Save_Time()
}
list_buttons_clicked = []
function mouse_down(argument, down){
	if(down){
		list_buttons_clicked.push(argument.toElement.id)
		argument.toElement.time = setTimeout(() => {
			list_buttons_clicked.splice(list_buttons_clicked.indexOf(argument.toElement.id))

			// Minutes
			if(argument.path[1].childNodes[5].innerHTML == 'Minutes'){
				argument.toElement.interval_time_pass = setInterval(() => {
					if(argument.toElement.id.slice(0, 2) == 'up'){
						add_or_subtract_time(true, 'Minutes', argument.path[1].childNodes[3].childNodes[0], 10)
					}else{
						add_or_subtract_time(false, 'Minutes', argument.path[1].childNodes[3].childNodes[0], 10)
					}
				}, 500)
			// Hours
			}else{
				argument.toElement.interval_time_pass = setInterval(() => {
					if(argument.toElement.id.slice(0, 2) == 'up'){
						add_or_subtract_time(true, 'Hours', argument.path[1].childNodes[3].childNodes[0], 1)
					}else{
						add_or_subtract_time(false, 'Hours', argument.path[1].childNodes[3].childNodes[0], 1)
					}
				}, 100)
			}
		}, 500)
	}else{
		if(argument.fromElement == null){
			clearTimeout(argument.toElement.time)
			clearInterval(argument.toElement.interval_time_pass)
			if(list_buttons_clicked.indexOf(argument.toElement.id) != -1){
				// Minutes
				if(argument.path[1].childNodes[5].innerHTML == 'Minutes'){
					if(argument.toElement.id.slice(0, 2) == 'up'){
						add_or_subtract_time(true, 'Minutes', argument.path[1].childNodes[3].childNodes[0], 1)
					}else{
						add_or_subtract_time(false, 'Minutes', argument.path[1].childNodes[3].childNodes[0], 1)
					}
				// Hours
				}else{
					if(argument.toElement.id.slice(0, 2) == 'up'){
						add_or_subtract_time(true, 'Hours', argument.path[1].childNodes[3].childNodes[0], 1)
					}else{
						add_or_subtract_time(false, 'Hours', argument.path[1].childNodes[3].childNodes[0], 1)
					}
				}
				list_buttons_clicked.splice(list_buttons_clicked.indexOf(argument.toElement.id))
			}
		}else{
			clearTimeout(argument.fromElement.time)
			clearInterval(argument.fromElement.interval_time_pass)
		}
	}
}

// Click
up_hour.onmousedown = (argument) => {mouse_down(argument, true)}
down_hour.onmousedown = (argument) => {mouse_down(argument, true)}
up_minutes.onmousedown = (argument) => {mouse_down(argument, true)}
down_minutes.onmousedown = (argument) => {mouse_down(argument, true)}
// MouseUp
up_hour.onmouseup = (argument) => {mouse_down(argument, false)}
down_hour.onmouseup = (argument) => {mouse_down(argument, false)}
up_minutes.onmouseup = (argument) => {mouse_down(argument, false)}
down_minutes.onmouseup = (argument) => {mouse_down(argument, false)}
// MouseOut
up_hour.onmouseout = (argument) => {mouse_down(argument, false)}
down_hour.onmouseout = (argument) => {mouse_down(argument, false)}
up_minutes.onmouseout = (argument) => {mouse_down(argument, false)}
down_minutes.onmouseout = (argument) => {mouse_down(argument, false)}

//-----------------////-----------------// Key Typed //-----------------////-----------------////-----------------//
// Check Key Typed
function verif_key(argument, type_string){
	// remove all digits if not number
	if(isNaN(argument.key) || argument.key == ' '){
		for(i = argument.target.value.length - 1; i >= 0; i--){
			x = argument.target.value[i]
			if(isNaN(x) || argument.key == ' '){
				argument.target.value = argument.target.value.replace(argument.target.value[i], '')
			}
		}
	}
	// digit limiter
	if(argument.target.value.length > 2){
		argument.target.value = argument.target.value[0] + argument.target.value[1]
	}
	// number limiter
	if(type_string == 'hour'){
		if(Number(argument.target.value) > 23){
			argument.target.value = argument.target.value[0]
		}
	}else{
		if(Number(argument.target.value) > 59){
			argument.target.value = argument.target.value[0]
		}
	}
	Save_Time()
}
hour_clock.onkeyup = (argument) => {
	verif_key(argument, 'hour')
}
minute_clock.onkeyup = (argument) => {
	verif_key(argument, 'minute')
}