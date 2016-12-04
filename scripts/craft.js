var furnace = {
	inputDrop: function(){
		$('#furnaceInput').droppable({
			accept: function(e){
				var classes = acceptedMaterial("furnaceInput")
				for (var i = 0; i < classes.length; i++) {
					if ( e.attr("id") === classes[i] ){
						return true
					}
				};
				return false
			},
			drop: function(e, ui) {
					// if empty
					if( $(this).children().length === 0){
				        $(this).append(dragged);
				        ui.draggable.remove()
						furnace.inputDrag()
						var percComplete = parseInt( $('#furnace #progress .trail').css('width') )
						if (percComplete === 305) {
							furnace.begin()
						};
					} else {
						var currentID = $(this).children('div').attr("id")
						var drag = dragged.children('div')
						//////////////////////////////////////////////////////////////////////////////////////o9
						// if same item
						if ( drag.attr("id") === currentID ) {
							var currentCounter = $(this).children('div').children(' .tableCounter')
							var dragCounter = dragged.children('div').children(' .tableCounter')
							var currentNum = parseInt( currentCounter.html() )
							var dragNum = parseInt( dragCounter.html() )
							if (currentNum + dragNum > 20) {
								// add up to twenty and return whats left to original
								var remainder = ( currentNum+dragNum ) - 20
								currentCounter.html( "20" )
								dragCounter.html( String(remainder) )
							} else {
								// just add up - no return
								currentCounter.html( String(currentNum+dragNum) )
								ui.draggable.remove()
							}

							furnace.inputDrag()
							var percComplete = parseInt( $('#furnace #progress .trail').css('width') )
							if (percComplete === 305) {
								furnace.begin()
							};
						} else {
							// display error saying that items are not the same
							$(this).addClass('fullCell')
							var self = $(this)
							setTimeout(function(){
								self.removeClass('fullCell')
							},1000)
						}
					}
			      	
					setTimeout(function(){
						dragging = false
					},100)

			},
			hoverClass: "hoverOver",
		})
	},
	fuelDrop: function(){
		$('#furnaceFuel').droppable({
			accept: function(e){
				var classes = acceptedMaterial("furnaceFuel")
				for (var i = 0; i < classes.length; i++) {
					if ( e.attr("id", classes[i]) ){
						return true
					}
				};
				console.log(e.attr('id'))
				return false
			},
			drop: function(e, ui) {
					// if empty
					if( $(this).children().length === 0 ){
				        $(this).append(dragged);
				        ui.draggable.remove()
				        furnace.fuelDrag()
				        var barIn = parseInt( $('#furnace .barInner').css('width') );
				        if (!barIn) {
							furnace.addFuel()
				        };
				        furnace.begin()
					} else {
						var currentID = $(this).children('div').attr("id")
						var drag = dragged.children('div')
						// if same item
						if ( drag.attr("id") === currentID ) {
							var currentCounter = $(this).children('div').children(' .tableCounter')
							var dragCounter = dragged.children('div').children(' .tableCounter')
							var currentNum = parseInt( currentCounter.html() )
							var dragNum = parseInt( dragCounter.html() )
							if (currentNum + dragNum > 20) {
								// add up to twenty and return whats left to original
								var remainder = ( currentNum+dragNum ) - 20
								currentCounter.html( "20" )
								dragCounter.html( String(remainder) )
							} else {
								// just add up - no return
								currentCounter.html( String(currentNum+dragNum) )
								ui.draggable.remove()
							}

							furnace.fuelDrag()
							var barIn = parseInt( $('#furnace .barInner').css('width') );
							if (!barIn) {
								furnace.addFuel()
							};
							
							furnace.begin()
						} else {
							// display error saying that items are not the same
							$(this).addClass('fullCell')
							var self = $(this)
							setTimeout(function(){
							},1000)
								self.removeClass('fullCell')
						}
					}
			      	
					setTimeout(function(){
						dragging = false
					},100)

			},
			hoverClass: "hoverOver",
		})
	},







	inputDrag: function(){
		$('#furnaceInput>div').draggable({
			zIndex: 99999,
			cursor: "files/img/other/pickUp.png",
			revert: "invalid",
			start: function(){
				$('#craftPage').css('overflow', '');
				dragging = true;
				$(this).addClass('inputDrag');
				dragged = this.outerHTML;
				dragNdrop.reveal(false, true, true);
			},
			stop: function(){
				dragging = false
				home.storage.clearClasses()
			},	
		});
	},
	fuelDrag: function(){
		$('#furnaceFuel>div').draggable({
			zIndex: 99999,
			cursor: "files/img/other/pickUp.png",
			revert: "invalid",
			start: function(){
				$('#craftPage').css('overflow', '');
				dragging = true;
				$(this).addClass('fuelDrag');
				dragged = this.outerHTML;
				dragNdrop.reveal(false, true, true);
			},
			stop: function(){
				dragging = false
				home.storage.clearClasses()
			},	
		});
	},
	outputDrag: function(){
		$('#furnace .out > div').draggable({
			zIndex: 99999,
			cursor: "files/img/other/pickUp.png",
			revert: "invalid",
			start: function(){
				dragging = true;
				$(this).addClass('outputDrag');
				dragged = this.outerHTML;
				dragNdrop.reveal(false, true, true);
				dragNdrop.inventory.drop()
				dragNdrop.storage.drop()
			},
			stop: function(){
				dragging = false
				home.storage.clearClasses()
			},	
		});	
	},


//=============//
// STARTS HERE //


	begin: function(){
		var thereIsItem = $('#furnaceInput').children().length;
		if (thereIsItem) {

			var inputID = $('#furnaceInput div').attr("id");
			var recArr = this.furnaceRecepieCheck( inputID );
			var quantity = parseInt( $('#furnaceInput .tableCounter').html() );

			var thereIsQuantity = quantity >= recArr[1];
			var thereIsFuel = this.isFuel();
			if ( thereIsFuel && thereIsQuantity ) {
				$('#progress .percent').fadeIn(500)
				this.halted()
				this.timePassed = 0;
				this.timeTaken = recArr[2];
				this.produces = recArr[3];
				this.producesQ = recArr[4];
				this.consumeInput(quantity, recArr[1])
				this.init();
			} else {
				if (!thereIsFuel) {
					this.halted("fuel")
				};
				if (!thereIsQuantity) {
					this.halted("input", true)
				};
			}
		} else {
			this.halted("input")
		}
	},
	consumeInput: function(oldQuant, deducted){
		if (oldQuant === deducted) {
			$('#furnaceInput').empty();
		} else {
			var change = oldQuant - deducted;
			$('#furnaceInput .tableCounter').html(change)
			
		}
	},
	furnaceRecepieCheck: function(itemId){
		for (var i = 0; i < furnaceRecepie.length; i++) {
			if (furnaceRecepie[i][0] === itemId) {
				return furnaceRecepie[i];
			};	
		};
	},
	timePassed: 0,
	timeTaken: undefined,
	produces: undefined,
	producesQ: undefined,
	halted: function(which, inputType){
		if (which === "input") {
			if (inputType) {
				$('#inputWarn').show().addClass('noQuantity')
			} else {
				$('#inputWarn').show().addClass('noItem')
			}
			$('#furnace .in').addClass('warnF')
		} else if (which === "fuel") {
			$('#fuelWarn').show().addClass('noFuel')
			$('#furnaceFuel').addClass('warnF')
		} else {
			$('#inputWarn').fadeOut(300).removeClass('noItem noQuantity');
			$('#furnace .in').removeClass('warnF');
			$('#fuelWarn').fadeOut(300).removeClass('noFuel');
			$('#furnaceFuel').removeClass('warnF');
		}
	},

	init: function(){
		var fuel = furnace.fuel()
		console.log("OI VEY fuel is "+fuel)
		if ( fuel ) {

			this.timePassed++
			this.ui()

			if ( this.timePassed === this.timeTaken ) {
				setTimeout(function(){
					furnace.finish();
				},500)
			} else {
				setTimeout( function(){
					furnace.init()
				}, 1000 )
			}

		} else {
			// if not enough fuel, halt.
			this.halted("fuel")
		}

	},

	finish: function(){
		var itemID = this.produces;
		$('#progress .percent').fadeOut(500)
		if ($('#furnace .out').children().length === 0) {
			subClass = searchForItemProperty(itemID, 2)
			url = searchForItemProperty(itemID, 4)
			var string = '<div id="' +itemID+ '"><span class="tableCounter">'+ this.producesQ+'</span><img src="' +url+ '" class="hoverText ' +itemID+ ' ' +classOfItem+ '"></div>'

			$('#furnace .out').append(string)
			this.outputDrag();
		} else {
			if ($('#furnace .out').children('div').attr("id") === itemID) {
				var prevQ = parseInt( $('#furnace .out .tableCounter').html() )
				$('#furnace .out .tableCounter').html( prevQ + this.producesQ )
			} else {
				this.halted = true
			}
		}
		setTimeout(function(){
			furnace.begin()

		}, 1000)
		
	},

	ui: function(){
		// display fuel bar
		// and arrow 
		// and percent
		var percent = (this.timePassed / this.timeTaken) * 100;
		var perMod = Math.floor( percent )
		var fuelBar = (this.fuelBits / this.maxBits) * 100
		var bar = $('#furnace .fuel .barInner')
		bar.velocity({width: fuelBar + "%"}, 500)


		var arrow = $('#progress .trail')
		var px = (perMod/100) * 305
		arrow.velocity({width: px+"px"}, 1000)

		var perc = $('#progress .percent span');
		perc.fadeOut(100, function(){
			$(this)
				.empty()
				.html(Math.floor(percent) + "%")
				.fadeIn(200)	
		})

	},



// id, how many, time taken, produces...



// fuel stuff

	fuelBits: 0,
	maxBits: 0,
	fuel: function(){
		// checks if there is any fuel
		var bool;
		if( this.fuelBits > 0 ){
			this.fuelBits--
			bool = true
		} else {
			// check for any more items in fuel
			if ( $('#furnaceFuel').children().length !== 0 ){
				// children exist
				this.addFuel();
				bool = true
			} else {
				bool = false
			}
		}
		return bool
	},
	addFuel: function(){
		var id = $('#furnaceFuel div').attr("id")
		var counter = $('#furnaceFuel .tableCounter')
		var value = parseInt( counter.html() )
		if ( value > 1 ) {
			value--
			// insert new value into html
			counter.html(value)
			this.maxBits = this.checkFuelBits(id); // returns amount of bits
			this.fuelBits += this.maxBits;

		} else if (value === 1){
			$('#furnaceFuel').empty()
			// delete item instead of reducing number
			this.maxBits = this.checkFuelBits(id); // returns amount of bits
			this.fuelBits += this.maxBits;			
		} else {
			throw new Error("No fuel in tableCounter")
		}
		var fuelBar = (this.fuelBits / this.maxBits) * 100
		var bar = $('#furnace .fuel .barInner')
		bar.velocity({width: fuelBar + "%"}, 500)
	},
	isFuel: function(){
		var fern = $('#furnaceFuel').children().length;
		if (fern === 0 && this.fuelBits === 0) {
			return false;
		} else return true;
	},
	checkFuelBits: function(id){
		// returns with fuel value to be added
		console.log("searching for "+id);
		for (var i = 0; i < fuelArray.length; i++) {
			if (fuelArray[i][0] === id) {
				return fuelArray[i][1];
			};
		};
	},
}

var fuelArray = []
fuelArray[0] = ["flint", 50]
fuelArray[1] = ["yShard", 80]
fuelArray[2] = ["boogey", 150]

var furnaceRecepie = []
// id, how many, time taken, produces, how many...
furnaceRecepie[0] = ["flint", 1, 10, "rGem", 2]
// furnaceRecepie[1] = 
// furnaceRecepie[2] = 
// furnaceRecepie[3] = 






var smithy = {

}


var alchemy = {

}



window.acceptedMaterial = function(type){
	var arr = [];
	if (type === "furnaceFuel") {
		console.log("fuel called")
		arr = ["flint"]
	} else if (type === "furnaceInput") {
		console.log("input called")
		arr = ["flint", "flint"]
	} else {
		throw new Error("Invalid argument supplied to acceptedMaterial()")
	}

	return arr;
}
