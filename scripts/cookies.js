
//variables 
var dataF = {
	time:{
		startTime: function(){
			setInterval(function(){
				dataF.time.addTime(0, 0, 0, 5)
			},1000)
		},
		total: function(){},
		clipboardCounter : [false, false, true, false],
		clock: function(){
			var days = String(data.time.days);
			var hours = String(data.time.hours);
			var minutes = String(data.time.minutes);
			var seconds = String(data.time.seconds);
			var shours, sminutes, sseconds;
			if ( hours.length !== 2 ) { shours = "0" + hours} else shours = hours;
			if ( minutes.length !== 2 ) { sminutes = "0" + minutes} else sminutes = minutes;
			if ( seconds.length !== 2 ) { sseconds = "0" + seconds} else sseconds = seconds;
			$('#insertTime').html("Day " + data.time.days + " - " + shours + "<span class=" + 'timeSpan' + ">:</span>" + sminutes + "<span class=" + 'timeSpan' + ">:</span>" + sseconds);
		},
		now: function(){
			return new Date();
		},
		addTime: function(d, h, m, s){
			var sec = parseInt(data.time.seconds);
			var min = parseInt(data.time.minutes);
			var hour = parseInt(data.time.hours);
			var day = parseInt(data.time.days);
			var tD, tH, tM, tS;

			tS = ((sec + s) < 60) ? (sec + s) : false;
			tM = ((min + m) < 60) ? (min + m) : false;
			tH = ((hour + h) < 24) ? (hour + h) : false;
			if (tS === false) {
				tS = (sec + s) - 60;
				tM++;
			};
			if (tM === false) {
				tM = (min + m) - 60;
				tH++;
			};
			if (tH === false) {
				tH = (hour + h) - 24;
				day++
			};
			// console.log("tH is " + tH + " tM is " + tM + " and tS is " + tS)

			data.time.seconds = parseInt(tS);
			data.time.minutes = parseInt(tM);
			data.time.hours = parseInt(tH);
			data.time.days = parseInt(day);

			this.changeBackground()
		},
		changeBackground: function(){
			var time = data.time.hours;
			var day = $('#backgrounds div.day')
			var sunset = $('#backgrounds div.sunset')
			var sunrise = $('#backgrounds div.sunrise')
			var night = $('#backgrounds div.night')
			if (time <= 6) {
				night.fadeIn(3000);
				sunset.fadeOut(10000);
				day.fadeOut(10000);
				sunrise.fadeOut(10000);
				if (this.clipboardCounter[0] === false) {
					postToClipboard("Its past midnight... Perhaps I should go to sleep soon.")
					for (var i = 0; i < 4; i++) {
						this.clipboardCounter[i] = false
					};
					this.clipboardCounter[0] = true 
				};

			} else if (time <= 7){
				sunrise.fadeIn(3000);
				sunset.fadeOut(10000);
				night.fadeOut(10000);
				day.fadeOut(10000);
				if (this.clipboardCounter[1] === false) {
					postToClipboard("Its sunrise!")
					for (var i = 0; i < 4; i++) {
						this.clipboardCounter[i] = false
					};
					this.clipboardCounter[1] = true 
				};
				
			} else if(time <= 18 ){
				day.fadeIn(3000);
				night.fadeOut(10000);
				sunset.fadeOut(10000);
				sunrise.fadeOut(10000);
				if (this.clipboardCounter[2] === false) {
					postToClipboard("Its daytime!")
					for (var i = 0; i < 4; i++) {
						this.clipboardCounter[i] = false
					};
					this.clipboardCounter[2] = true 
				};
			} else if(time <= 19){
				sunset.fadeIn(3000);
				night.fadeOut(10000);
				day.fadeOut(10000);
				sunrise.fadeOut(10000);
				if (this.clipboardCounter[3] === false) {
					postToClipboard("The sun's setting. I hope I can get back home before its dark...")
					for (var i = 0; i < 4; i++) {
						this.clipboardCounter[i] = false
					};
					this.clipboardCounter[3] = true 
				};
			} else if(time <= 24){
				night.fadeIn(3000);
				sunset.fadeOut(10000);
				day.fadeOut(10000);
				sunrise.fadeOut(10000);
				if (this.clipboardCounter[0] === false) {
					postToClipboard("Its night... I should be careful.")
					for (var i = 0; i < 4; i++) {
						this.clipboardCounter[i] = false
					};
					this.clipboardCounter[0] = true 
					// monster difficulty decreases here ...............	
				};
			} else throw new Error("Invalid time in changeBackground()");
			
			this.clock();
		},
		backgroundInit: function(){
			var time = data.time.hours;
			var day = $('#backgrounds div.day')
			var sunrise = $('#backgrounds div.sunrise')
			var sunset = $('#backgrounds div.sunset')
			var night = $('#backgrounds div.night')
			if (time <= 6) {
				night.show()
			} else if (time <= 7){
				sunrise.show()				
			} else if(time <= 18 ){
				day.show()
			} else if(time <= 19){
				sunset.show()
			} else if(time <= 24){
				night.show()
			} else throw new Error("Invalid time in backgroundInit()");
			this.clock()
		}		
	}
}


// pInventoryArray.push([ ids[i], imgs[i], classOfItem, string ]);

var data = {
	_id: "save",
	user: {
		username: "Stranger",
		Class: false,
		previousData: false
	},

	pStats: {
		attack: 5,
		magic: 5,
		defence: 5, 
		magicDefence: 5,
		speed: 5, 	
		luck: 5, 
		
		endurance: 0,
		wisdom: 0,
		moneyBonus: 100,
		woodBonus: 100,
		fishingBonus: 100,
		itemDropBonus: 100
	},

	pStatus: {
		currentHealth: 100,
		currentXp: 0, 
		currentMana: 100,
		level: 1,
		afflicted: {
			poison: false,
			stun: false,
			burn: false,
			freeze: false,
			bind: false
		},

		dead: function(){
				//some stuff like this
				console.log("test");
				return "Game Over"
			  }
	},

	pEquipment: {
		weapon: false,
		
		weaponType: false,
		weaponMin: false,
		weaponMax: false,


		tools: false,

		armour: false,
		special: false,
		array: new Array(),
		equipped: false
	},

	pInventory: {
		dirak: 100,
		essence: 0,

		array: new Array(),
		weaponImg: false,
		toolImg: false,
		armourImg: false,
		specialImg: false
	},

	monstersdefeated: {
		slime: 0,
		bat: 0,
		dragon: 0 	
	},

	maxStats: {
		maxHealth: 200, 
		maxXp: 50,
		maxMana: 200,
		attack: 1000,
		defence: 1000,
		luck: 600,
		agility: 500
	},

	time: {
		days: 1,
		hours: 8,
		minutes: 0,
		seconds: 0
	},
	obj: {
		moneyIsOpen: true,
		
		rockArray: [0],
		treeArray: [0,0,0,0,0,0,0,0,0,0,0,0,0],
		bushArray: [0,0,0,0,0,0],
		shrubArray: [0,0,0,0,0]
	}
}

$(document).ready(function() {
	spreadTheLove();
	loadData();
  	dataF.time.backgroundInit()
	player.healthInit();
	player.XPInit();
	player.manaInit();
	player.currencyInit();
	player.levelInit();
	postToClipboard("Hmm... What shall I do...")
	dragNdrop.allInit();
	dataF.time.startTime()

});

var previousData = false;
var storageLocal = false;

function loadData(){

	// var h = window.height()
	// var w = window.width()
	// window.resizeTo(w,h)

	//check for previous data
	if (localStorage.getItem("save") !== null) {
		previousData = true;
		console.log("Previous data? " + previousData)
	} else {
		console.log("Previous data? " + previousData)
	}


	// check if storage
	if (typeof(localStorage) != undefined){
		storageLocal = true;
		console.log("localStorage will be used")
	} else console.log('no storage available')



	if (previousData) {
		console.log("Data exists. Inserting values from Storage...");
		if (storageLocal){
			var load = localStorage.getItem("save");
			load = JSON.parse( load );
			data = load;
			console.log("JSON localStorage data is loaded")
			setTimeout(function(){
				$('#loading').fadeOut(400);
					setTimeout(function(){
						$('#welcomeInner').fadeIn(1200, function(){
							welcome('old');
						})
				}, 1000)
			}, 4000)

		} else {
			throw new Error("No Local Storage")
		}
		spreadTheLove();
		objLoad();
		pInvLoad();
	} else {
		spreadTheLove();
		console.log("New Game");
		setTimeout(function(){
			$('#loading').fadeOut(400);
				setTimeout(function(){
					$('#welcomeInner').fadeIn(1200, function(){
						welcome('new');
					})
				}, 1000)
		}, 4000)
	};


};


function saveData(){
	console.log("Initialising Save...")
	console.log("localStorage is " + storageLocal)
	pInv();
	bringBackTheLove();
	home.storage.saveStorage("local")
	if ( storageLocal ) {
		var objectString = JSON.stringify( data );
		localStorage.setItem( "save", objectString )

		console.log("localStorage is saved. Example => \n" + localStorage.getItem("save") )
	} else {
		throw new Error("Save Disabled")
	}
}







		

































