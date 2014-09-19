var level1State = {
	preload: function() {
		var waves = [
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	],
	[
	{"number": 2, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 4, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 8, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 },
	{"number": 1, "type": "Guy", "life":20,"gold":20, "value": 1, "strength":20 }
	]];
	},

	create: function() {
		var niveau1 = new Niveau(waves, design);
		var hero = new Hero(niveau1.initialHeroLife, niveau1.initialGold);

	},

	update : function(){

		


	},
};