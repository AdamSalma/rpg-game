var dragged;
var reverting = true;
var dragging = false;

jQuery(document).ready(function($) {


	// ignore this
	$('#dragContainer').on('click', 'td', function(event) {
		event.stopPropagation()
	});
	
	$('#storagePage .tableWrap td').hover(function() {
		$(this).addClass('hoverOver')
	}, function() {
		$(this).removeClass('hoverOver')
	});
	// dragContainer open/close
	$('#dragContainer').on('click', function() {
		if (!dragging) {
			if ($('#dragContainer').hasClass('open')) {
				home.storage.togS(false);
			} else {
				home.storage.togS(true);
			}
		};
	});


	// ========== //
	// STOREITEMS //
	// ========== //

	$('#storeItems').click(function(){
		$('#dragContainer').children().hide();
		$('#storagePage').css('overflow', 'hidden');
		$( "#sInventory" ).trigger( "click" );
		
		home.storage.init();
		//drag
		dragNdrop.storage.drag()
		dragNdrop.inventory.drag()
		//drop
		dragNdrop.storage.drop()
		dragNdrop.inventory.drop()

	
		



		// makes cell big+orange
		$('#storageTable').on("mousedown", "td", function() {
			var self =  $(this);
			
			$('#storageTable td').each(function() {
				$(this).removeClass('sCo').css('margin', '10px');
			});

			$(this).addClass('sCo');
			if ($(this).children().length !== 0) {
				var extracted = $(this).children('div').children('img').attr('src');
				$('#storageImg').hide().attr('src', extracted).fadeIn(400);
			} else {
				$('#storageImg').hide();
			}
		});
	});

		//craft

		$('#craft').click(function(){
			$( "#sInventory" ).trigger( "click" );
			postToClipboard("Drop an item in the boxes on the left to power the furnace.<br>Use flint, available from 'add items' button at the top.<br>z-index is weird so the dragged item is behind the screen. Still works though, keep trying lol.<br>Nothing else apart from the furnace works so far.", true)
			home.craft.init()
			
		})	
		$('#toCraftS').click(function() {
			transition.toC()		
		});
		$('#toStorageC').click(function() {
			transition.toS()		
		});

		$('.closeSC').click(function() {
			home.storage.deInit()
			home.craft.deInit()
		});
// ready
});
		// $('#storagePage tbody').slimScroll({
		// 		    color: 'darkorange',
		// 		    height: '255px',
		// 		    size: '10px',
		// 		    distance: '5px',
		// 		    opacity: 1,
		// 		    alwaysVisible: true,
		// 		    railVisible: true,
		// 		    railColor: "#cc7000"
		// 		}).css('overflow', '');

var questUnlockStorageShit = 0;
var storageCapacity;


var home = {
	storageCraftTransition: function( bool ){
		if ( bool ) {
			home.storage.deInit();
			setTimeout(function(){
				home.craft.init();
			}, 500 )
		} else {
			home.craft.deInit();
			setTimeout(function(){
				home.storage.init();
			}, 500 )
		}
	},
	craft: {
		init: function(){
			this.Show();
			furnace.inputDrop()
			furnace.fuelDrop()
		},
		deInit: function(){
			this.Hide();
		},
		Show: function(){
			$( '#innerScreenBackground' )
				.fadeIn(200);

			$( '#craftPage' )
				.css('width', '0')
					.show()
						.removeClass('sClose')
							.addClass('sOpen')
							$('#craftPage .arrow .trail').velocity({width: "305px"}, 1200)
							setTimeout(function(){
								$('#furnace .out').fadeIn(1000);
							},500)
								
							setTimeout(function(){
								$('#dragContainer').css({
									width: "172px", height: "28px", opacity: 0, display: "block"
								}).velocity({opacity: 1}, 800);
								$('#dragContainerWrap').show()
								$('#toStorageC').fadeIn(400);
							},1000)
								
		},
		Hide: function(){
			$('#dragContainer').fadeOut(400, function(){	
				$('#craftPage .arrow .trail').velocity({width: "0px"}, 700)
				$('#furnace .out').fadeOut(400);
				$( '#craftPage' )
						.removeClass('sOpen')
						.addClass('sClose');

					$('#craftPage').fadeOut(500);
				$('#toStorageC').fadeOut(200, function(){
					$( '#innerScreenBackground' ).fadeOut(500);
					
				});
			});
		},
	},
	storage: {
		Show: function(){

			$( '#innerScreenBackground' )
				.fadeIn(600);

			$( '#storagePage' )
				.css('width', 0)
					.show()
					.removeClass('sClose')
						.addClass('sOpen')
						setTimeout(function(){
							$('#dragContainer').css({
								width: "172px", height: "28px", opacity: 0, display: "block"
							}).velocity({opacity: 1}, 600);
							$('#dragContainerWrap').show()
							$('#toCraftS').fadeIn(400);
						},1000)
							
		},
		Hide: function(){
			this.togS(false);
			$('#dragContainerWrap').fadeOut(400, function() {
				$('#storagePage')
					.removeClass('sOpen')
					.addClass('sClose')
						.fadeOut(600)
				$('#innerScreenBackground').fadeOut(700)
					
			});
			$('#toCraftS').fadeOut(200)
		},
		init: function(){
			this.loadStorage()
			this.loadTable();
			this.Show();
			$('#storageText').html("\
						<span class='text'>\
							Click on an item to reveal its' details. <br><br>\
							You can also drag items between the storage and your inventory!\
						</span>")
			
		},
		deInit: function(){
			this.Hide()
			this.saveStorage("session")
			$('#storageTable').empty()
		},
		cellCapacity: function(){
			return 7 + this.questUnlock;
		},
		questUnlock: 14,
		storage: [],
		loadTable: function(){
			// create and fill table:
			// how many cells in total
			$('#storageTable').empty()
			var cellQ = this.cellCapacity();
			// used in loop to specify how many cells
			var remainder = cellQ % 7;
			// # of rows
			var rows = Math.ceil(cellQ / 7)
			console.log("Cells="+cellQ+", Remainder="+remainder+", Rows="+rows)
			//loop through row/cell
			for (var r = 0; r < rows; r++) {
				console.log("Iteration number "+ (r+1))
				var rowID = "storageRow" + (r+1);
				console.log(rowID)
				$('#storageTable').append('<tr id="'+ rowID +'"></tr>')

				var rowBonus = r*7
				var rem;
				if (r+1 === rows) {
					rem = remainder;
					console.log("Cell Remainder="+rem)
				} else rem = false;
				for (var i = 0; i < (rem || 7); i++) {
					console.log("2nd. Iteration number "+ (i+1))
					// if there is something in the array. rowBonus is bonus for every new row
					if (home.storage.storage[0] !== undefined && home.storage.storage[i + rowBonus]) {
						$('#'+rowID)
							.append('<td class="td'+ (i+1) +'">'+ home.storage.storage[i+rowBonus] +'</td>')
						console.log("If activated")
					} else {
						$('#'+rowID)
							.append('<td class="td'+ (i+1) +'"></td>')
					}

					if (i > 20) {
						break;
					};
				};
				dragNdrop.storage.drop()

			};
		},
		pushTable: function(){
			$('#storageTable td').each(function() {
				if( $(this).children().length > 0 ){
					var div = $(this).children('div').outerHTML
					storageArray.push(div);
				}
			});
		},
		organiseTable: function(){
			// organise the contents of storageArray here
		},
		loopStorage: function(){
			this.storage.length = 0
			$('#storageTable td').each(function(index) {
				if ($(this).children().length != 0) {
					var el = $(this).html();
					console.log(el)
					home.storage.storage[index] = el
				};
			});
		},
		saveStorage: function(typeOfStorage){
			this.loopStorage()
			console.log("Save type is " + typeOfStorage)
			if (typeOfStorage === "session") {
				window.sessionStorage.setItem("sStorage", home.storage.storage)
			} else if ( typeOfStorage === "local"){
				window.localStorage.setItem("storage", home.storage.storage)
			} else throw new Error("No arguments supplied to saveStorage")
		},
		loadStorage: function(){
			var session = window.sessionStorage.getItem("sStorage")
			var local = window.localStorage.getItem("storage")
			if ( session ){
				console.log(session)
				this.storage.length = 0;
				this.storage = session.split(',');
			} else if( local ){
				console.log(local)
				this.storage.length = 0;
				this.storage = local.split(",");
			} else {
				console.log("Nothing in storage")
				return false;
			}

		},
		togSVAR: true,
		togCVAR: true,
		togS: function( which, bool ){
			var drag = $('#dragContainer')
			var drag2 = $('#dragContainer2')
			if (which === "storage") {
				if (!bool) {
					if (this.togSVAR) {
						this.togSVAR = false;
						console.log("closing storage container")
						drag.children().fadeOut(400, function(){
							drag.removeClass('open')
								.velocity({"border-radius": "0px"}, 500, function(){
									setTimeout(function(){
										home.storage.togSVAR = true;
									},400)								
								})
						})
					};
				} else {
					if (this.togSVAR) {
						this.togSVAR = false;
						drag.addClass('open')
							.velocity({"border-radius": "10px"}, 500, function(){
								drag.children().fadeIn(400, function(){
									setTimeout(function(){
										home.storage.togSVAR = true;
									},400)
									
								})
							});
					};
				}
			} else {
				if (!bool) {
					if (this.togCVAR) {
						this.togCVAR = false;
						console.log("closing craft container")
						drag2.children().fadeOut(400, function(){
							drag2.removeClass('open')
								.velocity({"border-radius": "0px"}, 500, function(){
									setTimeout(function(){
										home.storage.togCVAR = true;
									},400)								
								})
						})
					};
				} else {
					if (this.togCVAR) {
						this.togCVAR = false;
						drag2.addClass('open')
							.velocity({"border-radius": "10px"}, 500, function(){
								drag2.children().fadeIn(400, function(){
									setTimeout(function(){
										home.storage.togCVAR = true;
									},400)
									
								})
							});
					};
				}
			}
		},
		clearClasses: function(){
			console.log("Clearing Classes")
			var storageCompartment = ["#storageTable", '#dragContainer', '#inventoryTable', '#furnaceFuel', '#furnaceInput']
			for (var i = 0; i < storageCompartment.length; i++) {
				$(storageCompartment[i]+ "> div").each(function() {
				});

			};
			dragNdrop.conceal()
		},
	}
}








var transition = {
	toC: function(){
		home.storage.saveStorage("session")
		home.storage.togS(false);
		$('#toCraftS').fadeOut(200)
		$('#dragContainerWrap').fadeOut(400, function() {
			$('#storagePage')
				.css('overflow', 'hidden')
				.removeClass('sOpen')
				.addClass('sClose')
				.fadeOut(600)					
			$( '#craftPage' )
				.css({width: 0})
				.show()
				.removeClass('sClose')
				.addClass('sOpen');
			$('#furnace .out').fadeIn(1000);
			$('#craftPage .arrow .trail').velocity({width: "305px"}, 1200)

			setTimeout(function(){
				$('#dragContainerWrap').fadeIn(400)
				$('#dragContainer').fadeIn(600)
				$('#toStorageC').fadeIn(400);
			},1000)
			furnace.inputDrop()
			furnace.fuelDrop()
		});	

	},
	toS: function(){
		home.storage.loadTable()
		$('#dragContainer').fadeOut(400, function(){	
			$( '#craftPage' )
					.removeClass('sOpen')
					.addClass('sClose')
					.css('overflow', 'hidden');

				$('#craftPage').fadeOut(500);
			$('#toStorageC').fadeOut(200);

			$( '#storagePage' )
				.css('width', 0)
				.show()
				.removeClass('sClose')
				.addClass('sOpen')
				setTimeout(function(){
					$('#dragContainer').fadeIn(600)


					$('#dragContainerWrap').fadeIn(400)
					$('#toCraftS').fadeIn(400);
					$( '#craftPage' ).css('overflow', 'visible')
				},1000)
	
		})
	},

}




















































var dragNdrop = {
	allInit: function(){
		this.container.drop()
		this.inventory.drop()
		this.inventory.drag()
		this.storage.drop()
		this.storage.drag()
	},
	container: {
		drag: function(){
					$('#dragContainer td>div').draggable({
						zIndex: 99999,
						helper: "clone",
						cursor: "files/img/other/pickUp.png",
						revert: "invalid",
						start: function(){

							dragging = true;
							$(this).addClass('containerDrag');
							dragged = this.outerHTML;
							dragNdrop.reveal(true, false, true);
						},
						stop: function(){
							dragging = false
							home.storage.clearClasses()
						},			
					})
		},
		drop: function(){
			$('#dragContainer td').each(function() {
				if ( $(this).data("uiDroppable") ) {
					$(this).droppable("destroy")
				}
				if ($(this).children().length === 0) {
					$(this).droppable({
						accept: function(e){
			    			if ( e.hasClass("storageDrag") || e.hasClass('inventoryDrag') ){
			    				return true;
			    			} else 
			    				return false;
						},
						drop: function(e, ui) {
						        $(this).append(dragged);
						        ui.draggable.remove()
						        dragNdrop.container.drag()
						        dragNdrop.storage.drop()
						        dragNdrop.inventory.drop()
						        // make its contents draggable
						      	
								setTimeout(function(){
									dragging = false
						        	home.storage.clearClasses()
								},100)

						},
						hoverClass: "hoverOver",

					 //    over: function () {
						// 		$('#dragContainerWrap .text').removeClass("blink").fadeOut(400);
						// 		home.storage.togS(true);
						// },
					});
				};
			});
		},
	}, 
	storage: {
		drag: function(){
				$('#storageTable td>div').draggable({
					cursorAt: {left: 20, top: 20},
					zIndex: 99999,
					helper: "clone",
					cursor: "files/img/other/pickUp.png",
					revert: "invalid",
					start: function(){

								dragging = true;
								$(this).addClass('storageDrag');
								dragged = this.outerHTML;
								dragNdrop.reveal(false, true, true);
								// toggle text
								if (!$('#dragContainer').hasClass('open')) {
									$('#dragContainerWrap .text').fadeIn(400).addClass("blink");
								};

								$('#dragContainer').mouseenter(function() {
									if (dragging) {
										$('#dragContainerWrap .text').removeClass("blink").fadeOut(400);
										home.storage.togS(true);
										
									};
								});

								//change overflow
								$('#storagePage').css('overflow', 'visible');
					},
					stop: function(){
						dragging = false;
						home.storage.clearClasses()
						$('#dragContainerWrap .text').removeClass("blink").hide();
					},
				})
		},
		drop: function(){
				$('#storageTable td').each(function() {
					console.log("test")
					if ( $(this).data("uiDroppable") ) {
						$(this).droppable("destroy")

					}
					if ($(this).children().length === 0) {
						$(this).droppable({
							accept: function(e){
				    			if ( e.hasClass("containerDrag") || e.hasClass('inventoryDrag') ){
				    				return true;
				    			} else return false;
							},
							drop: function(event, ui) {
						        $(this).append(dragged);
						        ui.draggable.remove()
						        home.storage.clearClasses()
						        dragNdrop.storage.drag()
						        dragNdrop.inventory.drop()
						        dragNdrop.container.drop()
								setTimeout(function(){
									dragging = false
								},100)
							},
							hoverClass: "hoverOver",

							///////////// do over: here. hover cells add class?
						});
					}
					//end
				});
		},
	},
	// on drag, use css to make overflow not hidden. same for other two
	inventory: {
		drag: function(){
					$('#tableInventory td>div').draggable({
						cursorAt: {left: 20, top: 20},
						zIndex: 99999,
						helper: "clone",
						cursor: "files/img/other/pickUp.png",
						revert: "invalid",
						start: function(){

							dragging = true;
							$(this).addClass('inventoryDrag');
							dragNdrop.inventory.drop()
							dragged = this.outerHTML;
							dragNdrop.reveal(true, true, false);
						},
						stop: function(){
							home.storage.clearClasses()
							dragging = false;
							$('#storageTable td').removeClass('emptyCell fullCell')
						},			
					})
		},
		drop: function(){
				$('#tableInventory td').each(function() {
					if ( $(this).data("uiDroppable") ) {
						$(this).droppable("destroy")

					}
					if ($(this).children().length === 0) {
						$(this).droppable({
							drop: function(event, ui) {
						        $(this).append(dragged);
						        ui.draggable.remove()
						        home.storage.clearClasses()
						        dragNdrop.inventory.drag()
						        dragNdrop.storage.drop()
						        dragNdrop.container.drop()
								setTimeout(function(){
									dragging = false
								},100)
							},
							hoverClass: "hoverOver",

							///////////// do over: here. hover cells add class?
						});
					}
					//end
				});
		},	
	},
	reveal: function(storage, container, inventory){
		if (storage) {
			$('#storageTable td').each(function() {
				$(this).removeClass('sCo')
				if ($(this).children().length === 0) {
					$(this).addClass('emptyCell')
				} else {
					$(this).addClass('fullCell')
				}
			});
		};
		if (container) {
			$('#dragContainer td').each(function() {
				if ($(this).children().length === 0) {
					$(this).addClass('emptyCell')
				} else {
					$(this).addClass('fullCell')
				}
			});
		};
		if (inventory) {
			$('#tableInventory td').each(function() {
				if ($(this).children().length === 0) {
					$(this).addClass('emptyCell')
				} else {
					$(this).addClass('fullCell')
				}
			});
		};
	}, 
	conceal: function(){
		$('#tableInventory td, #storageTable td, #dragContainer td')
			.removeClass('fullCell emptyCell')
			
	},



}



