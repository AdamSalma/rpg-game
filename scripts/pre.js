$(window).ready(function(){

	showItems();
	$('#welcomeBackground').jKit('parallax', { 'strength': '1', 'axis': 'both' });
})




playerInventoryArray = [];

playerimgs = [];

var warrior;
var mage;
var thief;
var harvester;
var globalArr;

// welcome screen testing
jQuery(document).ready(function($) {
	warrior = $('#charWarrior');
	mage = $('#charMage');
	thief = $('#charThief');
	harvester = $('#charHarvester');
	globalArr = [warrior, mage, thief, harvester]

	var textBool = true;
	var textBool2 = true;
	var copy = $('#copyInput')
	var pName = $('#playerName')

	var text;
	pName.on('keyup', function() {
		text = $(this).val()
    	text = text.charAt(0).toUpperCase() + text.slice(1)
		if (textBool) {
			if (textBool2) {
				copy.fadeOut(400);
				textBool2 = false;
				setTimeout(function(){
				copy.html(text).fadeIn(300);
					textBool = false;
				}, 400)
			}
		} else if (text === ""){
			copy.html("...");
			textBool = true
			textBool2 = true
		} else {
			copy.empty().html(text)
		}
	});


	//only has functions for display and not page load
	$('#startGame').on('click',function(){
		if (previousData === false){
			if( text === "" || text.length < 3 ) {
				$('#playerName').css('border-color', 'red');
				$('#nameConfirm').fadeIn(300);
				console.log("no");
			} else {
				$('#playerName').css('border-color', 'darkorange');
				data.user.username = text;
				console.log("Username has changed to " + data.user.username)
				saveData();
				$('#welcomeBackground').fadeOut(800)
				$('#welcomeInner').fadeOut(800)
				setTimeout(function(){
					$('#gameWrap, #game').fadeIn(1000).css('display', 'inline-block');;
				}, 800)
			}
		} else if (previousData === true){
			$('#welcomeBackground').fadeOut(800)
			$('#welcomeInner').fadeOut(800)
			setTimeout(function(){
				$('#gameWrap, #game').fadeIn(1000);
			}, 800)
		}
		
	})
	$('#continueGame').mouseover(function(){
		$('#welcomeBackground, #welcomeInner').velocity({
			'opacity':"0.91"
		});
		$('#px').css('border-image', 'radial-gradient(circle,  skyblue 20%, black 80%);');
		$(this).velocity({"border-color": "darkorange"}, 500);
	})
	$('#continueGame').mouseout(function(){
		$('#welcomeBackground, #welcomeInner').velocity({
			'opacity':"1"
		});
		$(this).css({"border-color": "white"});
	})

	$('#continueGame').on('click', function() {
		
		$('#welcomeBackground').fadeOut(800);
		$('#welcomeInner').fadeOut(800);
		setTimeout(function(){
			$('#gameWrap, #game').fadeIn(1000).css('display', 'inline-block');;
		}, 800);

	});

	var newText;
	$('#charCreate').on('click', function() {
		
		var reg = new RegExp("[^a-zA-Z]");
		var bool = reg.test(text);
		console.log("bool")

		if( text === "" || text.length < 3 || bool ) {
			$('#playerName').css('border-color', 'red');
			$('#nameConfirm').fadeIn(300);
			console.log("Invalid username. Only text allowed you scum.");
			if (text === newText) {
				$('#nameConfirm').html("Ok fine...")
				$('#charCreationPage').fadeIn(1000);
				$('#charCreationPage .innerWrap').css('border', '#101010 1px solid');
				theThing()
			} else {
				newText = text
			}
		} else {
			$('#playerName').css('border-color', 'darkorange');
			data.user.username = text;
			console.log("Username has changed to " + data.user.username)
			$('#charCreationPage').fadeIn(1000);
			$(this).fadeOut(500);
			$("#welcomeInner").fadeOut(900);
			$('#charCreationPage .innerWrap').show();
			theThing()
		};
	//charCreate click end
	});
	function theThing(){
		setTimeout(function(){
			$('#charCreationPage .fadeIn1').html("So you wish to embark on a perilous journey then, " +data.user.username+ "?").fadeIn(1000, function(){
				setTimeout(function(){
					 $('#charCreationPage .fadeIn1').delay(500).fadeOut(400, function(){
					 	$(this).delay(400).html("Choose your class before you can begin:").fadeIn(1000).velocity({top: "55px"}, 900, function(){
							$('#charCreationPage .charClasses').fadeIn(1000); 
					 	})	
					 })
				},1000)
			});
		}, 900);
	}


	//return to welcome screen
	$('#welcomeClose').on('click', function() {
		$('#charCreationPage').hide(400);
		$('#loadGame').hide(400);

	});

	//click a class
	$('#charCreationPage .charClasses div').on('click', function() {
		window.type;
		if (this.id === "charWarrior") {
			type = "war"
		} else if (this.id === "charMage" ) {
			type = "alc"	
		} else if (this.id === "charThief") {
			type = "the"
		} else {
			type = "har"
		}
		centerAndLeft(true)
		
	});
	
	$('#charCreationPage').on('click', '#charNo', function() {
		// return from character info screen.
		centerAndLeft(false)
	});

	//if class is chosen
	$('#charYes').on('click', function(){
		
		$('.fadeIn1, #charClasses, .charClasses').fadeOut(800)
		
		setTimeout(function(){
			$('#charCreationPage .charClasses').fadeOut(400)
		}, 1800)
		//  name = name.charAt(0).toUpperCase() + name.slice(1);

			
		var Path = type === "war" ? charStats.war :
			   type === "alc" ? charStats.alc :
			   type === "the" ? charStats.the : 
			   type === "har" ? charStats.har : 
			   console.warn("classInfo() wrong input == " + type);
		//set user stats
		var user = Path.title
		data.user.Class = user.toLowerCase()
		data.pStats.attack = Path.pAtk
		data.pStats.magic = Path.mAtk
		data.pStats.defence = Path.pDef
		data.pStats.magicDefence = Path.mDef
		data.pStats.speed = Path.speed
		data.pStats.luck = Path.luck
		if (user === "Harvester") {
			data.pStats.goldBonus = 200;
			data.pStats.woodBonus = 200;
			data.pStats.fishingBonus = 200;
			data.pStats.itemDropBonus = 200;
		}
		console.log("User stats have been set. Initialising finalisation.")

		$('#finalisationWrap').append("\
			<div id='fConvo'>\
			<span id='_1'>I see you've chosen to become a " +user+ ". Interesting decision...</span><br /><br />\
			<span id='_2'>Before you begin your journey I have a few things to tell you.</span><br />\
			<span id='_3'>You are entering a world full of many strange creatures that will see you as prey.</span><br /> \
			<span id='_4'>You must become stronger, and reverse the roles of the hunter and the hunted to survive.</span><br /><br /> \
			<span id='_5'>When you have reached your potential, you will be able to venture into the furthest parts of the world and find your way out.</span><br />\
			<span id='randomNumber'>Until then, survive...</span><br /><br />\
			<span id='_6'>I must leave you now " +data.user.username+ ", but before that I will teleport you to your new home.</span><br /> \
			<span id='_7'>...</span><br />\
			<span id='_8'>You wish to know my name? It is Ulric.</span><br />\
			<span id='_9'>Let me know when you're ready to begin your journey.</span>\
			<span id='beginGame' class='welcomeBox'>Begin...</span>\
		</div>")



		//this piece of shit took me more than an hour of debugging to figure out. setTimeout() is the worst part of javascript
		setTimeout(function(){
			$('#fConvo span').each(function(index) {
				var self = this.id;
				setTimeout(function(){
					$("#"+self).fadeIn(1000);
				}, index*1800);
			});
			setTimeout(function(){
				$('#skipFinal').fadeIn('slow');
			}, 4000);
		}, 3200)




		//can't be bothered to delegate its 9am been coding since i woke up at 11pm lol
		$('#charCreationPage').on('click', '#beginGame', function() {
			spreadTheLove()
			saveData()
			$('#finalisationWrap').fadeOut(400);
			$('#charCreationPage .innerWrap').fadeOut(400);
			$('#fConvCent').hide().delay(1500).html("I'll be watching you from the shadows...").fadeIn(400).delay(1200).fadeOut(1200);
			
			//quick zoom in on defocused circle to mimic teleportation.... lol the budgets pretty low
			setTimeout(function(){
				$('#dot, #square').fadeIn(800);
				dot();
			}, 3000)
			
		});

	
	});

	$('#skipFinal').click(function() {
		$('#fConvo span').fadeIn(400);
	});

	
// jQuery ready end
});


	// transitions from charCreation to game
	function dot(){
		var h = $(window).height();
		var w = $(window).width();
		if (w >= h) {
			// widescreen
			$('#dot').velocity({width: h, height: h}, 1000, "linear", function(){
				expandBorder()
			});			
		}  else {
			// phone => longscreen (if thats a word)
			$('#dot').velocity({width: w, height: w}, 1000, "linear", function(){
				expandBorder()
			});
		}
		function expandBorder(){
			$('#dot').velocity({
				width: w, height: h, 
			    borderTopLeftRadius: 0, 
			    borderTopRightRadius: 0, 
			    borderBottomLeftRadius: 0, 
			    borderBottomRightRadius: 0
			}, 800, "linear", function(){
				$('#welcomeBackground').hide();
				$('#charCreationPage').hide();
				$('#dot, #square').fadeOut(1500);
				setTimeout(function(){
					postToClipboard("## Press Esc to toggle 'admin mode'", true)
					postToClipboard("## I still have a lot of work to do, so go easy on any flaws (theres lots!) :) ", true)
					postToClipboard("Hi! And welcome to my game.", true)
					$('#gameWrap, #game').fadeIn(800)
				}, 2000)
			});
		}

	
			
			
		
		
	}

var previousTop;
function centerAndLeft(forwards){
	console.log(type)
	var selected = type === "war" ? 0 :
			   type === "alc" ? 1 :
			   type === "the" ? 2 : 
			   type === "har" ? 3 : 
			   console.warn("classInfo() wrong input == " + type);
	if (forwards) {
		classInfo()
		$('.fadeIn1').velocity({opacity: 0}, 500);
		$.each(globalArr, function(index) {
			if (index === selected) {
				previousTop = $(this).css('top');
				$(this).stop(true).delay(300).animate({top: "200px", "font-size": "100px"}, 1200, "easeOutSine")
				return
			}
			$(this).velocity({opacity: 0}, 500);
		});
	} else {
		classInfo(true)
		$('.fadeIn1').velocity({delay: 500, opacity: 1}, 300);
		$.each(globalArr, function(index) {
			if (index === selected) {
				$(this).delay(200).animate({top: previousTop, "font-size": "30px"}, 700, "easeOutSine")
				return
			}
			$(this).velocity({opacity: 1},{delay:500}, 200);
		});
	}
}


function classInfo(bool){
	var mainWindow = $('#charClasses')
	if (bool) {	
		mainWindow.fadeOut(400)
		return
	}
	var table = $('#charClasses table')
	var Path = type === "war" ? charStats.war :
			   type === "alc" ? charStats.alc :
			   type === "the" ? charStats.the : 
			   type === "har" ? charStats.har : 
			   console.warn("classInfo() wrong input == " + type);

	var signs = Path.signs;
	var name = Path.title;
	var color = Path.color;
	var ability = Path.spTxt

	table.find("#charStats td:odd").each(function(index) {
		var currentCell = signs[index]
		if (currentCell.charAt(0) === "+") {
			$(this).removeClass().addClass('textLime')
		} else if (currentCell.charAt(0) === "-") {
			$(this).removeClass().addClass('textRed')
		} else {
			$(this).removeClass().addClass('textGrey')
		}
		$(this).html(currentCell)
	});

	mainWindow.find('.insertClass').html(name).removeClass().addClass('insertClass ' + color)
	table.find('#charFooter').html(ability).removeClass().addClass(color)
	
	mainWindow.hide().delay(1900).slideDown("slow");
	
}








function welcome(gameType){

	var weltxt = $('#welcomeText');

	if (gameType === "new") {
		weltxt.html("Welcome, " + data.user.username);
		var input = "Its seems that we haven't met before."
		var input2 = "Tell me, what is your name?"
	  	
	  	$('#welcomePrompt').empty().append(input);
	  	$('#welcomePrompt2').empty().append(input2);
	  		// 
		setTimeout(function(){
	    	$('#welcomePrompt').fadeIn(800)

	    	setTimeout(function(){
		    	$('#welcomePrompt').fadeOut(800, function(){
		    		$('#welcomePrompt2').fadeIn(400)
		    		setTimeout(function(){
		    			$('#playerName').fadeIn(1000)		    			
		    		}, 1000)
	    		});
	    	}, 2000)
	    		
	    }, 1300);

	} else if (gameType === "old") {
		console.log("Players username is " + data.user.username)
		weltxt.html("Welcome back, " + data.user.username);
		var input = "<i>The monsters await...</i>"
    	$('#welcomePrompt').empty().html(input).css('top', '20px');

	  	//3 boxes at bottom
	  	setTimeout(function(){
	  		welcomeBoxes();
	    	$('#loadGame').show();
	    	$('#newGame').show();
	    	$('#charCreate').hide();
	    	$('#startGame').hide();
	    	$('#continueGame').show();
	  	}, 2000);

    	setTimeout(function(){
	    	$('#welcomePromptWrap, #welcomePrompt').fadeIn(700)
	    }, 1300);

	};

	//fadein slide left
    weltxt.fadeIn(2000)


  
};



function welcomeBoxes(){
	var welcomeBoxes = $('#welcomeBoxes');
	welcomeBoxes.fadeIn(500);
	welcomeBoxes.toggleClass('fadeInUp animated');
	welcomeBoxes.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e){
		$(e.target).removeClass('fadeInUp animated');
	})
}
// welcomeBackground
// welcomeInner
// welcomeText
// welcomeTextJs
// welcomePromptWrap
// welcomePrompt
// welcomeBoxes
// welcomeBoxes

var charStats = {
	war : {
		color: "textRed",
		title: "Warrior",
		signs: [
		// atk,  matk, pdef, md, sped, luck, end, int,
			"++", "--", "=", "-", "=", "=", "++", "---"
		],
		pAtk : 7,
		mAtk : 3,
		pDef : 5,
		mDef : 3,
		speed : 5,
		luck : 5,
		end : 2,
		int : -4,
		spTxt : 'Bonus Ability: Extra Spirit Essence gained from battles.'
	},
	alc : {
		color: "textBlue",
		title: "Mage",
		signs: [
		// atk,  matk, pdef, md, sped, luck, end, int, sp
			"--", "++", "--", "++", "=", "=", "=", "++"
		],
		pAtk : 3,
		mAtk : 7,
		pDef : 2,
		mDef : 8,
		speed : 5,
		luck : 5,
		end : 0,
		int : 2,
		spTxt : 'Bonus Ability: Starts with 4 battle skills.'
	},
	the : {
		color: "textGreen",
		title: "Thief",
		signs: [
		// atk,  matk, pdef, md, sped, luck, end, int, sp
			"+", "+", "-", "-", "++", "--", "=", "="
		],
		pAtk : 6,
		mAtk : 6,
		pDef : 4,
		mDef : 4,
		speed : 15,
		luck : 2,
		end : 0,
		int : 0,
		spTxt : 'Bonus Ability: Cheaper shop items, and faster travel.'
	},
	har : {
		color: "textGold",
		title: "Harvester",
		signs: [
		// atk,  matk, pdef, md,  sped, luck, end, int, sp
			"--", "--", "-", "-", "=", "+++", "--", "--"
		],
		pAtk : 3,
		mAtk : 3,
		pDef : 4,
		mDef : 4,
		speed : 4,
		luck : 20,
		end : -4,
		int : -4,
		spTxt : 'Bonus Ability: 2x more of <i>all</i> resources gained.'
	}
}