
var bosses = ["Asylum Demon - Undead Asylum", "Stray Demon - Undead Asylum Revisit", "Taurus Demon - Undead Burg", 
		"Capra Demon - Lower Undead Burg", "Bell Gargoyles - Undead Parish", "Gaping Dragon - The Depths", 
		"Chaos Witch Quelaag - Quelaag's Domain", "Iron Golem - Sen's Fortress", "Dark Sun Gwyndolin - Anor Londo", 
		"Ornstein and Smough - Anor Londo", "Crossbreed Priscilla - Painted World of Ariamis", "Sancturary Guardian - Sancturary Garden", 
		"Knight Artorias - Royal Wood", "Black Dragon Kalameet - Royal Wood", "Manus, Father of the Abyss - Chasm of the Abyss", 
		"Moonlight Butterfly - Darkroot Garden", "Great Gray Wolf Sif - DarkRoot Basin", "The Four Kings - The Abyss", 
		"Seath the Scaleless - The Duke's Archives", "Pinwheel - The Catacombs", "Gravelord Nito - Tomb of Giants", 
		"Ceaseless Discharge - Demon Ruins", "Demon Firesage - Demon Ruins", "Centipede Demon - Demon Ruins", 
		"The Bed of Chaos - Lost Izalith", "Gwyn, Lord of Cinder - Kiln of the First Flame"];

var bossesToLoc = [10, 10, 7, 9, 5, 11, 17, 4, 2, 2, 3, -1, -1, -1, -1, 6, 8, 24, 1, 13, 20, 18, 18, 18, 19, 25];

var miniBosses = ["Black Knight - Undead Asylum Revisit", "Black Knight - Undead Burg", "Havel the Rock - Undead Burg", 
			"Hellkite Dragon - Undead Burg", "Armored Tusk - Undead Parish", "Black Knight - Undead Parish",
			"Prowling Demon - Undead Parish", "Butcher - The Depths", "Giant Undead Rat - The Depths",
			"Parasitic Wall Hugger - Blighttown", "Prowling Demon - Sen's Fortress", "Prowling Demon - Anor Londo", 
			"Hydra - Ash Lake", "Undead Prince Ricard - Sen's Fortress", "Prowling Demon - Anor Londo",
			"Undead Dragon - Painted World of Ariamis", "Black Knight - Darkroot Basin", "Golden Crystal Golem - Darkroot Basin",
			"Hydra - Darkroot Basin", "Undead Dragon - Valley of Drakes", "Armored Tusk - The Duke's Archives",
			"Black Knight - The Catacombs", "Prowling Demon - The Catacombs", "Black Knight - Tomb of Giants",
			"Prowling Demon - Lost Izalith"];

var miniBossesToLoc = [10, 7, 7, 7, 5, 5, 5, 11, 11, 14, 4, 2, 3, 8, 8, 8, 21, 1, 13, 13, 20, 19];

var locID = ["crystal", "dukes", "anor", "ariamis", "sens", "parish", "garden", "burg", "basin", "lower", "asylum", "depths", "shrine",
 			"catacombs", "blight", "hollow", "ash", "quelaag", "ruins", "izalith", "giants", "drakes", "londo", "altar", "abyss", "kilin"];

// 25 mini bosses
var zeroMiniBosses = "0000000000000000000000000";
// 26 bosses
var zeroBosses = "00000000000000000000000000";
// 26 locations
var zeroLocations = "00000000000000000000000000";

var numBosses = 26;
var numMiniBosses = 25;
var numLocations = 26;

var bossStatus;
var minibossStatus;
var locationStatus;
var cookie;

var locStat = [];

function loc(centerX, centerY, halfWidth, halfHeight, shape) {
	this.centerX = centerX;
	this.centerY = centerY;
	this.halfWidth = halfWidth;
	this.halfHeight = halfHeight;
	this.shape = shape;
};

locStat.push(new loc(177, 52, 38, 14, "rectangle"));
locStat.push(new loc(177, 112, 45, 14, "rectangle"));
locStat.push(new loc(325, 112, 46, 28, "oval"));
locStat.push(new loc(527, 75, 74, 14, "rectangle"));
locStat.push(new loc(325, 182, 44, 14, "rectangle"));
locStat.push(new loc(325, 248, 46, 27, "oval"));
locStat.push(new loc(528, 248, 44, 14, "rectangle"));
locStat.push(new loc(325, 315, 44, 14, "rectangle"));
locStat.push(new loc(528, 315, 38, 14, "rectangle"));
locStat.push(new loc(177, 349, 40, 26, "oval"));
locStat.push(new loc(425, 358, 44, 14, "rectangle"));
locStat.push(new loc(177, 420, 32, 14, "rectangle"));
locStat.push(new loc(325, 406, 40, 39, "oval"));
locStat.push(new loc(635, 406, 38, 14, "rectangle"));
locStat.push(new loc(177, 475, 32, 14, "rectangle"));
locStat.push(new loc(52, 475, 48, 14, "rectangle"));
locStat.push(new loc(53, 540, 40, 14, "rectangle"));
locStat.push(new loc(176, 539, 54, 14, "rectangle"));
locStat.push(new loc(176, 595, 50, 14, "rectangle"));
locStat.push(new loc(176, 666, 68, 14, "rectangle"));
locStat.push(new loc(635, 465, 38, 14, "rectangle"));
locStat.push(new loc(528, 475, 37, 14, "rectangle"));
locStat.push(new loc(528, 540, 47, 14, "rectangle"));
locStat.push(new loc(411, 596, 50, 14, "rectangle"));
locStat.push(new loc(527, 596, 26, 14, "rectangle"));
locStat.push(new loc(411, 665, 51, 14, "rectangle"));

var context = document.getElementById("map").getContext("2d");
var map;

var mapLoaded = false;

window.addEventListener('load', function () {
	map = new Image();
	map.onload = function() {
        update();
    };
    map.src = 'https://obscureemporium.files.wordpress.com/2015/06/map.jpg';
	cookie = document.cookie;
	//document.cookie="data=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
	if(cookie.length == 0)
	{
		// No cookie yet add one
		initializeCookie();
	}

	bossStatus = cookie.substr(5, numBosses);
	minibossStatus = cookie.substr(31, numMiniBosses);
	locationStatus = cookie.substr(56, numLocations);

	setup();

	document.getElementById("map").addEventListener('click', function (event) {
		var point = { x:event.clientX, y:event.clientY};
		var canvasLocation = document.getElementById("map").getBoundingClientRect();
		point.x = point.x - canvasLocation.left;
		point.y = point.y - canvasLocation.top;
		handleHit(point);
	});
});

function initializeCookie() {
	cookie = "data=" + zeroBosses + zeroMiniBosses + zeroLocations
	document.cookie = cookie;
};

function setup () {
	// bosses
	for (var i = 0; i < numBosses; i++)
	{
		var new_boss = document.createElement("input");
		new_boss.setAttribute("id", "boss" + i);
		new_boss.setAttribute("type", "checkbox");
		if (bossStatus.charAt(i) == "1")
			new_boss.checked = true;
		else
			new_boss.checked = false;
		new_boss.addEventListener("click", function (event) {
			var id = parseInt(event.target.getAttribute("id").substr(4));
			bossStatus = bossStatus.flipChar(id);
			update();
		});
		document.getElementById("bossList").appendChild(new_boss);
		document.getElementById("bossList").appendChild(document.createTextNode(bosses[i]));
		document.getElementById("bossList").appendChild(document.createElement("br"));
	}

	// minibosses
	for (var i = 0; i < numMiniBosses; i++)
	{
		new_boss = document.createElement("input");
		new_boss.setAttribute("id", "miniboss" + i);
		new_boss.setAttribute("type", "checkbox");
		if (minibossStatus.charAt(i) == "1")
			new_boss.checked = true;
		else
			new_boss.checked = false;
		new_boss.addEventListener("click", function (event) {
			var id = parseInt(event.target.getAttribute("id").substr(8));
			minibossStatus = minibossStatus.flipChar(id);
			update();
		});
		document.getElementById("miniBossList").appendChild(new_boss);
		document.getElementById("miniBossList").appendChild(document.createTextNode(miniBosses[i]));
		document.getElementById("miniBossList").appendChild(document.createElement("br"));
	}
};

String.prototype.flipChar=function(index) {
	if (this.charAt(index) == "1")
		var flipped = "0";
	else
		var flipped = "1";
	return this.substr(0, index) + flipped + this.substr(index+1);
}

function update() {
	updateCookie();
	var canvas = document.getElementById("map");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(map, 0, 0);
	for (var i = 0; i < numLocations; i++) {
		if (locationStatus.charAt(i) == '1')
		{
			context.fillStyle = "red";
			context.font = "20px Arial";
			context.fillText("DONE!",locStat[i].centerX-30,locStat[i].centerY+8);
		}
	}

	var missing = false;
	var x = 700;
	var temp = 40;
	for (var i = 0; i < numBosses; i++) {
		if (((locationStatus.charAt(bossesToLoc[i]) == '1')||(bossesToLoc[i] == '-1'))&&(bossStatus.charAt(i) == '0'))
		{
			if (missing == false) {
				context.fillStyle = "red";
				context.font = "20px Arial";
				context.fillText("Don't forget to kill:",x,temp);
				missing = true;
				temp += 17;
				context.font = "14px Arial";
			}
			context.fillText(bosses[i],x,temp);
			temp += 17;		
		}
	}
	for (var i = 0; i < numMiniBosses; i++) {
		if ((locationStatus.charAt(miniBossesToLoc[i]) == '1')&&(minibossStatus.charAt(i) == '0'))
		{
			if (missing == false) {
				context.fillStyle = "red";
				context.font = "14px Arial";
				context.fillText("Don't forget to kill:",x,temp);
				missing = true;
				temp += 17;
			}
			context.fillText(miniBosses[i],x,temp);
			temp += 17;		
		}
	}
};

function updateCookie() {
	cookie = "data=" + bossStatus + minibossStatus + locationStatus;
	document.cookie = cookie;
};

function handleHit(point) {
	var hitIndex = findHitLocation(point);
	if (hitIndex == -1) return;
	locationStatus = locationStatus.flipChar(hitIndex);
	update();
}

function findHitLocation(point) {
	for (var i = 0; i < numLocations; i++) {
		if (locStat[i].shape == "rectangle") {
			if ((Math.abs(point.x-locStat[i].centerX) <= locStat[i].halfWidth) && (Math.abs(point.y-locStat[i].centerY) <= locStat[i].halfHeight))
			{
				return i;
			}
		}
		else if (locStat[i].shape == "oval") {
			// equation to find if point is within eclipse
			// http://math.stackexchange.com/questions/76457/check-if-a-point-is-within-an-ellipse
			var result = Math.pow((point.x - locStat[i].centerX), 2)/Math.pow(locStat[i].halfWidth, 2);
			result += Math.pow((point.y - locStat[i].centerY), 2)/Math.pow(locStat[i].halfHeight, 2);
			if (result <= 1)
			{
				return i;
			}
		}
	}
	return -1;
}
