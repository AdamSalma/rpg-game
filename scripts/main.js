
////////////////////
//NAVIGATING PAGES//
////////////////////

var objWidth, objHeight, screenDivID, t, l;


//Destination Window
$('#toHome').click(function(){
	postToClipboard("Hmm... What shall I do...")
	$('#index').fadeOut(300);
	$('#home').fadeIn(300);
})	
	$('#toIndex2').click(function() {
		$('#index').fadeOut(300);
		$('#index2').fadeIn(300);
	});
	$('#toHomeI').click(function() {
		$('#index2').fadeOut(300);
		$('#index').fadeIn(300);
	});
		$('#toIntersection').click(function() {
			$('#index2').fadeOut(300);
			$('#intersection').fadeIn(300);
		});
		$('#toHomeInt').click(function() {
			$('#intersection').fadeOut(300);
			$('#index2').fadeIn(300);
		});
$('#toVillageInt').click(function(){
	$('#intersection').fadeOut(300);
	$('#preVillage1').fadeIn(300);
})	
// village
	$('#toIntersectionV').click(function(){
		$('#intersection').fadeIn(300);
		$('#preVillage1').fadeOut(300);
	})	
	$('#toVillageI').click(function(){
		$('#villageGates').fadeIn(300);
		$('#preVillage1').fadeOut(300);
	})		
		$('#toPreVillage1').click(function(){
			$('#preVillage1').fadeIn(300);
			$('#villageGates').fadeOut(300);
		})	
		$('#toVillageG').click(function(){
			$('#villageGates').fadeOut(300);
			$('#village').fadeIn(300);
		})
// ruins
	// $('#toRuinsInt').click(function(){
	// 	$('#intersection').fadeOut(300);
	// 	$('#preRuins1').fadeIn(300);
	// })
	$('#toIntersectionR').click(function(){
		$('#intersection').fadeIn(300);
		$('#preRuins1').fadeOut(300);
	})	
	$('#toRuins2').click(function(){
		$('#preRuins1').fadeOut(300);
		$('#preRuins2').fadeIn(300);
	})

	$('#toRuins').click(function(){
		$('#preRuins2').fadeOut(300);
		$('#ruins').fadeIn(300);
	})	
	$('#toRuins2R').click(function(){
		$('#preRuins2').fadeIn(300);
		$('#ruins').fadeOut(300);
	})	








$('#toAdventure').click(function(){
	$('#index2 ').fadeOut(300);
	$('#adventure').fadeIn(300);
})	


// Toggling between mini Windows
var windowOpen = false
$('#sQuest').on('click', function() {
	if (miniWindowOpen) {
		$(".tri").css('background-color', 'white');

		// add shit here

		$(this).css('background-color', 'lightblue');
		$('#miniInventory').fadeOut(300)
		$('#miniEquipment').fadeOut(300)
		$('#miniQuest').fadeIn(600)
	}
});

$('#innerScreenBackground, #close').on('click',function(){
		closeWindows();
});

$('.closeInnerScreen').on('click', function(){
	closeWindows();
})

$('#checkoutNo').on('click', function(){
	closeWindows();
})

function closeWindows(){
	
	home.storage.deInit()
	home.craft.deInit()
	
	
	$('#shopMain').fadeOut()
	$('#checkout').fadeOut()
	$('#innerScreenBackground').fadeOut(500)
	$('#equipmentMain').fadeOut();
	$('#inventoryMain').fadeOut();
	$('#questsMain').fadeOut();
	$('#sellSS').fadeOut()
	$('#buySS').fadeOut()
	$('#optionsScreen').fadeOut()
	$('#traningWindow').fadeOut();
	setTimeout(function(){
		$('#optionsStatistics').empty()
		
	}, 700)




	windowOpen = false;
}

function closeMiniWindows(){
	$('#miniEquipment').fadeOut();
	$('#miniInventory').fadeOut();
	$('#miniQuest').fadeOut();
}

// End of the section


//Hidden page of inventory - buttons
$('#iEquip').on('click', function() {
	$('#iEquip').css({'background-color': 'orange'});
	$('#iItems').css({'background-color': 'white'});
	$('#inventoryEquipTab').show(300);
	$('#inventoryItemTab').fadeOut(200)
});


function showItems() { 
	$('#iItems').css({'background-color': 'orange'});
	$('#iEquip').css({'background-color': 'white'});
	$('#inventoryEquipTab').fadeOut(200);
	$('#inventoryItemTab').show(300)
}

$('#iItems').on('click', function() {
	showItems();
});




$('#resetHealth').click(function(){
	player.healthChange(player.HP())
	player.manaChange(player.mana())
})	

$('#goToSleep').click(function() {
	var h = $(window).height();
	var w = $(window).width();
	$('#game').css('z-index', '-101');
	$('#gameWrap').velocity({height: h, width: w}, 2000);
	$('#sleep').show().velocity({opacity: 1}, 1800, function(){
		sleepingTime()
		$('#sleep').append('<span>ZZZ...</span>').css('z-index', '99999999').hide();
		$('#sleep span').fadeIn(1500, function(){
			// $('#sleep span').fadeOut(400, function() {
				$('#sleep span').remove()
				$('#sleep').velocity({opacity: 0}, 2500)
				$('#gameWrap').velocity({width: '1000px', height: "600px"}, 2500, function(){
					$('#game').css('z-index', '1');
				});
			// });
		});
	});
});

function sleepingTime(){
	var hrs = data.time.hours
	if ( 7 <= hrs <= 19) {
		data.time.hours = 19
		data.time.minutes = 0
		data.time.seconds = 0
	} else if (hrs <= 19){

		data.time.hours = 7
		data.time.minutes = 0
		data.time.seconds = 0
		data.time.days++
	} else {
		data.time.hours = 7
		data.time.minutes = 0
		data.time.seconds = 0
	}
	dataF.time.clock()
	dataF.time.backgroundInit()
	
}



$('#charStats').click(function(){
	popupDialog("<b><u>Base Stats:</u></b><br/><b>Strength:</b> " + player.attack + "<br/><b>Luck:</b> " + player.luck + "<br/><b>Agility:</b>" + player.speed + "<br/><b>Defence:</b> " + player.defence)
})	




$('#options').click(function(){
	$('#innerScreenBackground').show()
	$('#optionsScreen').fadeIn();
	$('#optionPrompt').empty().html("Pick an option!")
})	
//code for options
	var scrolling = false;
	$('#saveGame, #configuration, #statistics').on('click',function(){
		self = this.id;
		$('#optionPrompt').empty();
		$('#saveGame, #configuration, #statistics').css('background-color', '');

		if (self === "saveGame") {

			$(this).css('background-color', 'lightgrey');
			if (scrolling) {
				destroySlimscroll('optionsStatistics');
				scrolling = false
			};

			saveData();
			$('#optionsConfiguration').fadeOut(400).empty()
			$('#optionsStatistics').fadeOut(400).empty()
			//hide everything else here
			$('#optionsSave').empty().html('<span>The game has been saved!</span>').fadeIn(600)
			postToClipboard("You can now refresh the game and many things will persist on reload, such as money, inventory items, equipment, storage chest items, level and xp, time, and many other small things.", true)
			setTimeout(function(){
				$('#optionsSave').fadeOut()
			}, 2000)
		} else if (self === "configuration") {
			if (scrolling) {
				destroySlimscroll('optionsStatistics');
				scrolling = false
			};
			$(this).css('background-color', 'lightgrey');

			$('#optionsStatistics').fadeOut(400).empty()
			$('#optionsSave').fadeOut(400).empty()
		} else { //statistics
			$(this).css('background-color', 'lightgrey');
			$('#optionsStatistics').slimScroll({
			    color: 'darkorange',
			    height: '230px',
			    size: '10px',
			    distance: '5px',
			    opacity: 1,
			    alwaysVisible: true,
			    railVisible: true,
			    wheelStep: 5,
			});
			scrolling = true
		}
	})

	window.destroySlimscroll = function(objectId) { 
		$("#"+objectId).parent().replaceWith($("#"+objectId)); 
	}




//================================//
//================================//
//================================//




//Home Window
$('#toIndexH').click(function(){
	clearC()
	$('#home').fadeOut(300);
	$('#index').fadeIn(300);
})

//quests
$('#quests').click(function(){
	
})	




//training grounds
$('#trainingGrounds').click(function(){
	$('#trainingGroundsPage').fadeIn(300);
	$('#village').fadeOut(300);
});
	$('#toVillageT').click(function() {
		$('#village').fadeIn(300);
		$('#trainingGroundsPage').fadeOut(300);
	});
	$('#trainStats').click(function() {
		$('#traningWindow').fadeIn(300)
		$('#innerScreenBackground').fadeIn(300)
	});




//back to index
$('#toIndexV').click(function(){
	$('#village').fadeOut(300);
	$('#villageGates').fadeIn(300);
})	



// Shop
$('#shop').click(function(){
	$('#village').fadeOut(300);
	$('#shopPage').fadeIn(300);
})	
	//Shop Window
	$('#buyS').click(function(){
		shop.open()

	})	
	$('#sellS').click(function(){
		$('#shopMain').fadeIn()
		$('#sellSS').fadeIn()
		$('#innerScreenBackground').fadeIn()
		$('#buySS').fadeOut()
		windowOpen = true;

	})	
	$('#toVillageS').click(function(){
		$('#village').fadeIn(300);
		$('#shopPage').fadeOut(300);
	})	

// Village Window //
//================//


//==================//
// Adventure Window //

$('#toIndexA').click(function(){
	$('#adventure').fadeOut(300);
	$('#index').fadeIn(300);
})	

	//============//
	//Caves Window//
	$('#toCaves').click(function(){
		$('#adventure').fadeOut(300);
		$('#caves').fadeIn(300);
	})
		$('#toCaves2').click(function() {
			$('#caves').fadeOut(300)
			$('#caves2').fadeIn(300)
		});
			$('#toCaves3').click(function() {
				$('#caves2').fadeOut(300)
				$('#caves3').fadeIn(300)
			});
		//return buttons
			$('#caves3Back').click(function() {
				$('#caves2').fadeIn(300);
				$('#caves3').fadeOut(300);
			});
		$('#caves2Back').click(function() {
			$('#caves').fadeIn(300);
			$('#caves2').fadeOut(300);
		});

		//=============//
		// CAVES BEGIN //
		//=============//

			$('#enterCaves').click(function() {
				$('#enterCaves').fadeOut(700, function(){
					$('#caves3').fadeOut(400)
					$('#innerCaves1').fadeIn(400, function(){
						$('#enterCaves').show();
						illuminate("1");
						// do some validatoin for what user has equipped
						// check by taking item img id, then searching through database for it and returning allItems[i][2], which will be "illuminate"
						
							// illuminateRoom();
							// this is to remove the mask page over the screen
							// back button has a high index, while the continue button has a small one so the masked image goes over the continue button, so the user can't prograss
							// make each click on a cave button a lot longer because its in the actual biome.
						
					})
				})
			});

			$('#toCaveScreen2').click(function() {
				var self = $(this);
				$(this).fadeOut(400, function(){
					$('#innerCaves1').fadeOut(300)
					$('#innerCaves2').fadeIn(50)
					illuminate("2");
					self.show()
				})
			});
				$('#toCaveScreen3').click(function() {
					var self = $(this);
					$(this).fadeOut(400, function(){
						$('#innerCaves2').fadeOut(300)
						$('#innerCaves3').fadeIn(50)
						illuminate("3");
						self.show()

					})
				});
					$('#toCaveScreen4').click(function() {
						var self = $(this);
						$(this).fadeOut(400, function(){
							$('#innerCaves3').fadeOut(300)
							$('#innerCaves4').fadeIn(50)
							illuminate("4");
							self.show()

						})
					});
						$('#toCaveScreen5').click(function() {
							var self = $(this);
							$(this).fadeOut(400, function(){
								$('#innerCaves4').fadeOut(300)
								$('#innerCaves5').fadeIn(50)
								illuminate("5");
								self.show()
		
							})
						});
							$('#toCaveScreen6').click(function() {
								var self = $(this);
								$(this).fadeOut(400, function(){
									$('#innerCaves5').fadeOut(300)
									$('#innerCaves6').fadeIn(50)
									illuminate("6");
									self.show()
			
								})
							});
							$('#backToCaveScreen5').click(function() {
								var self = $(this);
								$(this).fadeOut(400, function(){
									$('#innerCaves6').fadeOut(300)
									$('#innerCaves5').fadeIn(50)
									illuminate("5");
									self.show()
			
								})
								
							});	
						$('#backToCaveScreen4').click(function() {
							var self = $(this);
							$(this).fadeOut(400, function(){
								$('#innerCaves5').fadeOut(300)
								$('#innerCaves4').fadeIn(50)
								illuminate("4");
								self.show()
		
							})
						});
					$('#backToCaveScreen3').click(function() {
						var self = $(this);
						$(this).fadeOut(400, function(){
							$('#innerCaves4').fadeOut(300)
							$('#innerCaves3').fadeIn(50)
							illuminate("3");
							self.show()

						})
					});
				$('#backToCaveScreen2').click(function() {
					var self = $(this);
					$(this).fadeOut(400, function(){
						$('#innerCaves3').fadeOut(300)
						$('#innerCaves2').fadeIn(50)
						illuminate("2");
						self.show()

					})
				});
			$('#backToCaveScreen1').click(function() {
				var self = $(this);
				$(this).fadeOut(400, function(){
					$('#innerCaves2').fadeOut(300)
					$('#innerCaves1').fadeIn(50)
					illuminate("1");
					self.show()
				})
		});
		$('#backToCaveEntrance').click(function() {
			var self = $(this);
			$(this).fadeOut(400, function(){
				$('#innerCaves1').fadeOut(300)
				$('#caves3').fadeIn(50)
				self.show()
			})
		})
		// check to see if player has a light source
		function illuminate(i){
			if (player.special === "light") {
				$("#innerCaves" + i).css({
					"background-color": 'lightgrey',
					"background-image": 'background-image: radial-gradient(circle, black 31%, #262626 67%, grey 148%);'

					// lower durability of light source
					
				});
				if (firstTimeLight) {
					postToClipboard("I can see!")
				};
			} else {
				postToClipboard("It's too dark to see. <br>I need a light source...")
			}
		}

		//=============//
		// CAVES END //
		//=============//



	$('#toAdventureC').click(function(){
		$('#adventure').fadeIn(300);
		$('#caves').fadeOut(300);
	})

	//Caves Window//
	//============//

	
	//============//
	//Forest Window
	
	$('#toForest').click(function(){
		$('#adventure').fadeOut(300);
		$('#forest').fadeIn(300);
	});

	//Forest Window
	//============//



	$('#toAdventureF').click(function(){
		$('#adventure').fadeIn(300);
		$('#forest').fadeOut(300);
	})

//::::::::://
//SCRIPTING//
//::::::::://

$('#popupBackground').click(function(){
	$('#popupBackground').fadeOut();
	$('#popup').fadeOut().empty();
});











/////////////
//Attacking//

//variables
var enemyTurn = false;
var playerTurn = false;



function shakeHP(){
	$('#healthBar').velocity({left : "-=10"}, 50)
	$('#healthBar').velocity({left : "+=10"}, 50)
	$('#healthBar').velocity({left : "-=10"}, 50)
	$('#healthBar').velocity({left : "+=10"}, 50)
	
}


function eShakeHP(){
	$('#eHealthBar').velocity({left : "-=10"}, 50)
	$('#eHealthBar').velocity({left : "+=10"}, 50)
	$('#eHealthBar').velocity({left : "-=10"}, 50)
	$('#eHealthBar').velocity({left : "+=10"}, 50)
	
}

window.rInt = function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Attacking//
/////////////


$('#fight').click(function(){
	monsterPopupFadeOut();
	
	battle.on()
	setTimeout(function(){
		battle.startFight()
	}, 1700);
});
$('#flight').unbind().click(function(){
	monsterPopupFadeOut();
	postToClipboard("You escape with your tail between your legs and live to fight another day!")
	var deducted = Math.round(player.HP() * 0.04);
	player.healthChange(-deducted);
	atkC = 0
})

//tri baby
var triOpen;
var activated = true;
var self;



///////////////////
	//Small Functions//
	///////////////////


	function shakeRock(which){
		if (which) {
			var self = $(which);
			var random = Math.random();
			if (random <= 0.5){
				self.velocity({'left':'+=3px','top':'+=3px'}, 10).velocity({'left':'-=3px','top':'-=3px'}, 10);
			} else {
				self.velocity({'left':'-=3px','left':'+=6px'}, 10).velocity({'left':'+=3px','left':'-=6px'}, 10);
			}
		} else throw new Error("shakeRock() has not been given an argument");
	}

	$('#lvlbutton').click(function() {
		if ($(this).hasClass('close')) {
			levelup.term()
		} else {
			levelup.switchScreens()
		}
	});

	//clears clipboard
	function clearC() {
		$('#interaction1 div, #interaction1 hr ').fadeOut(400).remove();

	}


	//toggles monster alert
	function monsterPopupFadeIn() {
		$('#monsterPopup').fadeIn();
		$('#monsterPopupBackground').fadeIn();
	}
	function monsterPopupFadeOut() {
		$('#monsterPopup').fadeOut();
		$('#monsterPopupBackground').fadeOut();
	}


	//Calculate chance of dodge
	function calcDodge(objectName){
		var dodge = (objectName.agility / (data.maxStats.agility + (Math.random() * 10))) * (0.75 * objectName.luck);
		console.log("The change of a dodge was " + dodge);
		var dodge2 = objectName.agility / data.maxStats.agility;
		console.log("The chance* 2nd time was " + dodge2);
	}


	//change Health
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function popupDialog(text){
		$('#popupBackground').fadeIn();
		$('#popup').fadeIn().html("<span id='close'>&times;</span>" + "<span>" + text + "</span>");
		$('#close').click(function(){
			$('#popupBackground').fadeOut();
			$('#popup').fadeOut().delay(1000).empty();
		});
	}
	var previousMessage = undefined;
	function postToClipboard(value, perm){
		if (value !== previousMessage) {
			previousMessage = value
			var id = "a" + Date.now();
			var destination = $('#interaction1')
			var firstKid = $('#interaction1 div').first()
			destination
				.prepend("<div id=" +id+ ">" + value + "</div>")
				.children('div')
				.first().fadeIn(400)

			if (perm) {
				$("#" + id).addClass("intRem").click(function() {
					console.log("clicked on iD")
					$(this).remove()
				});
			} else {
				setTimeout(function(){
					$("#" + id).fadeOut(400, function(){
						$(this).remove();	
					})
				},8000)
			}
		}
	}



	// handy func but unnecessary
	// window.rgb2hex = function(rgb) {
	//      if (  rgb.search("rgb") == -1 ) {
	//           return rgb;
	//      } else {
	//           rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
	//           function hex(x) {
	//                return ("0" + parseInt(x).toString(16)).slice(-2);
	//           }
	//           return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
	//      }
	// }
		


	function eHealthChange(bool, value, other) {
		var change = value;
		var uniqueid = Date.now();
		var newId = "a" + uniqueid;
		var className;
		if (other) {
			if (other === "dodge") {
				change = "Miss";
				uniqueid = Date.now();
				newId = "a" + uniqueid;
				className = "textYellow"
				changeOuterDivTo("yellow", 0)
			} 

		} else {
			if (bool === "+") {
				change = bool + value;
				className = "textGreen"
				change = bool + change;
				postToClipboard("Enemy gained "+ value + " health!")
				eval("currentMonster" + battleBox.attacked + ".currentHealth += value" );
				if (eval("currentMonster" + battleBox.attacked + ".currentHealth" ) > eval("currentMonster" + battleBox.attacked + ".health" ) ) {
					eval("currentMonster" + battleBox.attacked + ".currentHealth" ) = eval("currentMonster" + battleBox.attacked + ".health" ) 
				};
			} else if (bool === "-") {
				className = "textRed"
				change = bool + change;		
				eShakeHP();
				eval("currentMonster" + battleBox.attacked + ".currentHealth -= value");
				if (eval("currentMonster" + battleBox.attacked + ".currentHealth <= 0 ") ) {
					eval("currentMonster" + battleBox.attacked + ".currentHealth = 0" )  
				};
			} else {
				throw new Error("eHealth() supplied with wrong arguments")
			}
		}

	}
	// Small Functions End


// object events
// stores the data

// === Rocks === //
$('#r1').click(function(e) {
	rockObj1.clicked($(this));
});


// === Bushes === //

$('#s1').click(function(e) {
	shrubObj1.clicked($(this), "pathway", e);
});
$('#s2').click(function(e) {
	shrubObj2.clicked($(this), "pathway", e);
});
$('#s3').click(function(e) {
	shrubObj3.clicked($(this), "pathway", e);
});




// === Bushes === //

$('#b1').click(function(e) {
	bushObj1.clicked($(this), "pathway", e);
});
$('#b2').click(function(e) {
	bushObj2.clicked($(this), "pathway", e);
});
$('#b3').click(function(e) {
	bushObj3.clicked($(this), "pathway", e);
});
$('#b4').click(function(e) {
	bushObj4.clicked($(this), "pathway", e);
});
$('#b5').click(function(e) {
	bushObj5.clicked($(this), "pathway", e);
});
$('#b6').click(function(e) {
	bushObj6.clicked($(this), "pathway", e);
});

// === Trees === //

$('#t1').click(function(e) {
	treeObj1.clicked($(this), "pathway", e);
});
$('#t2').click(function(e) {
	treeObj2.clicked($(this), "pathway", e);
});
$('#t3').click(function(e) {
	treeObj3.clicked($(this), "pathway", e);
});
$('#t4').click(function(e) {
	treeObj4.clicked($(this), "pathway", e);
});
$('#t5').click(function(e) {
	treeObj5.clicked($(this), "pathway", e);
});
$('#t6').click(function(e) {
	treeObj6.clicked($(this), "pathway", e);
});
$('#t7').click(function(e) {
	treeObj7.clicked($(this), "pathway", e);
});
$('#t8').click(function(e) {
	treeObj8.clicked($(this), "pathway", e);
});
$('#t9').click(function(e) {
	treeObj9.clicked($(this), "pathway", e);
});
$('#t10').click(function(e) {
	treeObj10.clicked($(this), "pathway", e);
});
$('#t11').click(function(e) {
	treeObj11.clicked($(this), "pathway", e);
});
$('#12').click(function(e) {
	treeObj12.clicked($(this), "pathway", e);
});
$('#t13').click(function(e) {
	treeObj13.clicked($(this), "pathway", e);
});

$('#game').on('click', '.droppedOnMap', function() {
	var id, arr;
	var yes = false
	var self = $(this)
	arr = $(this).attr('class').split(/\s+/);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] !== "droppedOnMap"){
			id = arr[i]
			yes = true
		}
	};
	if (yes) {
		self.velocity({top: "505px", left: "560px", opacity: 0}, 500, function(){
			toolBar.addToInventory(id)
		})
	}
});			



//sick example
//Outer div flashes a different color depending on the input
function changeOuterDivTo(color, repetitions) {
	var counter = 0;
	if (color === 'green') {
		$('#gameWrap').css('background-color', 'transparent');
		var interval = setInterval(function flashGreen(){
			if (counter <= repetitions) {
				counter++
				console.log(color + " " + repetitions)
					$('#gameWrap').velocity({"border-top-color": "#00e600","border-bottom-color": "#00e600","border-left-color": "#00e600","border-right-color": "#00e600"}, 450, "linear")
					.velocity({"border-color": 'black'}, 300, "linear", function(){flashGreen()}) 
			} else {
				clearInterval(interval);
				$('#gameWrap').css('background-color', 'black');
			}
		}(),500)
	} else if (color === 'red') {
		var interval = setInterval(function flashRed(){
			if (counter <= repetitions) {
				counter++
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#ff0000');
				},0)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#cc0000');
				},400)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#990000');
				},470)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#660000');
				},540)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#4d0000');
				},610)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#330000');
				},680)
				setTimeout(function(){
					$('#gameWrap').css('background-color', '#1a0000');
				},750)
				setTimeout(function(){
					$('#gameWrap').css('background-color', 'black');
				},800)
			} else {
				clearInterval(interval);
				$('#gameWrap').css('background-color', 'black');
			}
		}(),800)
	} else if (color === "yellow") {
		var interval = setInterval(function flashYellow(){
			if (counter <= repetitions) {
				counter++
				console.log(color + " " + repetitions)
					$('#gameWrap').css("background-color", 'black').velocity({"background-color": "yellow"}, 800, "linear", function(){flashYellow()})
			} else {
				clearInterval(interval);
				$('#gameWrap').css('background-color', 'black');
			}
		}(),500)
	}
}



	// moving clouds
	(function(){
		function cloud1(){
	         cloud.css('left', startPos);
	         cloud.velocity({left: -600}, 75000, 'linear')
	       };
	       
	        var screenWidth = $(document).width();
	        var startPos = screenWidth;
	        var cloud = $('#cloud1')
	        cloud1();
	        setInterval(function() {
	          cloud1();
	        }, 78000);
	      
	}());
	(function(){
		function cloud2(){
	         cloud.css('left', startPos);
	         cloud.velocity({left: -600}, 85000, 'linear')
	       };
	       
	        var screenWidth = $(document).width();
	        var startPos = screenWidth;
	        var cloud = $('#cloud2')
	        setTimeout(function(){
		        cloud2();
		        setInterval(function() {
		        	cloud2();
		        }, 86500);
	        },13000)
	      
	}());
	(function(){
		function cloud3(){
	         cloud.css('left', startPos);
	         cloud.velocity({left: -600}, 90000, 'linear')
	       };
	       
	        var screenWidth = $(document).width();
	        var startPos = screenWidth;
	        var cloud = $('#cloud3')
	        setTimeout(function(){
		        cloud3();
		        setInterval(function() {
		        	cloud3();
		        }, 91000);
	        },35000)
	      
	}());
	(function(){
		function cloud4(){
	         cloud.css('left', (startPos / 5));
	         cloud.velocity({left: -600}, 78000, 'linear')
	       };
	       
	        var screenWidth = $(document).width();
	        var startPos = screenWidth;
	        var cloud = $('#cloud4')
	        setTimeout(function(){
	        	cloud4();	
		        setInterval(function() {
		        	cloud4();
		        }, 80000);
	        },0)
	      
	}());
	(function(){
		function cloud5(){
	         cloud.css('left', startPos);
	         cloud.velocity({left: -600}, 95000, 'linear')
	       };
	       
	        var screenWidth = $(document).width();
	        var startPos = screenWidth;
	        var cloud = $('#cloud5')
	        setTimeout(function(){
		        cloud5();
		        setInterval(function() {
		        	cloud5();
		        }, 96000);
	        },5000)
	      
	}());

   

//End