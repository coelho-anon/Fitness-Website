window.onscroll = () => {
	function reveals_check(){
		reveals = document.getElementsByClassName('reveal')
		for (i = 0; i < reveals.length; i++) {
			if (window.innerHeight / 2 + window.scrollY > reveals[i].parentNode.offsetTop){
				if (i==0){
					$("#text_me").fadeIn(1000);
				}
				if (i==1){
					$("#about").fadeIn(1000);
				}
			}
		}
	}
	reveals_check()
}