var $session = 25;
var $break = 5;
var counter = 0;
var minutes = $session;
var seconds = 0;
var play = false;
var ding = new Audio();
ding.src = "DingSoundEffect.mp3" 
$(document).ready(function(){
	$('.session-increment').click(function(){
		if (play == false) {
			$session++;
			updateSession();
			if ($('#label').text() == "SESSION") {
				minutes = $session;
				seconds = 0;				
				updateTime();
			}
		}
	});

	$('.session-decrement').click(function(){
		if (play == false && $session > 1) {
			$session--;
			updateSession();
			if ($('#label').text() == "SESSION") {
				minutes = $session;
				seconds = 0;			
				updateTime();
			}
		}
	});

	$('.break-increment').click(function(){
		if (play == false) {
			$break++;
			updateBreak();
			if ($('#label').text() == "BREAK") {
				minutes = $break;
				seconds = 0;
				updateTime();
			}
			if ($break > 45) {
				alert("Really? Do you really need that LONG of a break?");
			}
		}
	});

	$('.break-decrement').click(function(){
		if (play == false && $break > 1) {
			$break--;
			updateBreak();
			if ($('#label').text() == "BREAK") {
				minutes = $break;
				seconds = 0;
				updateTime();
			}
		}
	});

	$('#play-pause').click(function(){
		play = !play;
		$('#play-pause').toggleClass("fa-pause fa-play");
	});

	$('.fa-stop').click(function(){
		$('#play-pause').addClass('fa-play');
		$('#play-pause').removeClass('fa-pause');
		play = false;
		if ($('#label').text() == "SESSION") {
			minutes = $session;
		}
		else {
			minutes = $break;
		}
		seconds = 0;
		update();
	});

	$('.fa-refresh').click(function(){
		$('#play-pause').addClass('fa-play');
		$('#play-pause').removeClass('fa-pause');
		play = false;
		$session = 25;
		$break = 5;	
		minutes = $session;
		seconds = 0;
		update();
	});

	function updateSession() {
		$('#session-counter').text($session);
	}

	function updateBreak() {
		$('#break-counter').text($break);
	}

	function updateTime() {
		if ($('#label').text() == "BREAK" && play == true) {
			$('#timer').css("color", "red");
		}
		else if ($('#label').text() == "SESSION" && play == true){
			$('#timer').css("color", "#00c136");
		}
		else {
			$('#timer').css("color", "#333");
		}
		$('#timer').text(numFormat(minutes, 2) + ":" + numFormat(seconds, 2));
		$('title').text("POMODORO " + $('#label').text() + ": " + numFormat(minutes, 2) + ":" + numFormat(seconds, 2));
	}

	function update() {
		updateSession();
		updateBreak();
		updateTime();
	}

	function countdown() {
		if (play == true) {
			if (seconds == 0) {
				minutes--;
				seconds = 60;
			}
			counter++;
			seconds -= counter;
			updateTime();
			counter = 0;
			if (minutes == 0 && seconds == 0) {
				ding.play();
				if ($('#label').text() == "SESSION") {
					$('#label').text("BREAK");
					minutes = $break;
				}
				else {
					$('#label').text("SESSION");
					minutes = $session;
					
				}
			}
		}
	}

	function numFormat(num) {
		var s = num + "";
		if (num < 10) {
			s = "0" + num;
		}
		return s;
	}

	setInterval(countdown, 1000);
});