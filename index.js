var players = [];
var namePool = ["Anderson","Rebbecca","Phung","Kacey","Janina","Evan","Nicholle","Adalberto","Renata","Josefine","Louella","Kimberli","Velma","Raisa","Lavette","Noel","Elenore","Teressa","Tawna","Essie","Alessandra","Bradley","Arianna","Corliss","Zetta","Jake","Rupert","Alissa","Doretta","Afton","Tesha","Earl","Christie","Ileen","Elena","Levi","Palmer","Keshia","Walker","Rosenda","Robby","Norbert","Elaine","Clifford","Sharron","Danial","Krista","Ranee","Annalisa","Janeen","Temika","Becky","Sharice","Lucina","Hettie","Carlota","Margo","Shela","Miguelina","Kittie","Ute","Lona","Rubie","Carmina","Berta","Mariko","Douglas","Hoa","Kristen","Demetra","Toi","Willard","Carole","Tonja","Rona","Mervin","Lanny","Megan","Terri","Diann","Yessenia","Donita","Tobias","Fae","Pennie","Shirlee","Cris","Franklyn","Natisha","Lulu","Benedict","Lieselotte","Hassan","Kieth","Allyn","Jillian","Laverne","Lakeesha","Vicky","Allena","Tona","Joan","Harley","Kandice","Lucienne","Sophie","Linnea","Alishia","Bobette","Mayola","Kathern","Thi","Emilie","Toby","Bertha","Orlando","Katia","Anneliese","Palma","Agnus","Katherine","Cleopatra","Elza","Pete","Judith","Nguyet","Roberto","Janella","Curtis","Vito","Krystyna","Herma","Fairy","Shanelle","Terrence","Lyndsay","Nathanael","Augustus","Samantha","Rosana","Erline","Jere","Rina","Tarah","Charise","Nancie","Delfina","Leatha","Tamala","Sook","Roxy","Zoraida","Juanita","Davina","Krystina","Lucile","Romeo","Kendra","Angeline","Vonnie","Florene","Jay","Tawanna","Sherman","Dennis","Natalia","Jeannette","Hortensia","Kirby","Evia","Lincoln","Alexia","Khalilah","Tonie","Terra","Alberta","Starr","Dexter","Josue","Monte","Patrina","Faviola","Almeta","Man","Seema","Ardath","Kyla","Florine","Keeley","Kylee","Onita","Sharonda","Nenita","Rema","Zulma","Lucila","Ewa","Piper","Corey","Clarence"];
var e = require('express.io');
var a = e().http().io();

a.use(e.cookieParser());
a.use(e.session({secret:'kl(&H87h*h87hi8&HI*T^&'}));

a.get('/',function(q,r){
	r.sendfile(__dirname+'/index.html');
});

a.io.route('players',{
	create: function (q) {
		if (!q.session.player) {
			var r = Math.floor(Math.random() * 199);
			var player = new Player();
			player.setName(namePool[r]);
			q.session.player = player;
			q.session.save(function(){
				players.push(player);
				a.io.broadcast('players:create',{player:player});
			});
		} else {
			q.io.emit('players:read',{players:players});
		}
	}
})

function Player () {}
Player.prototype.setName = function (name) {
	this.name = name;
}
Player.prototype.getName = function () {
	return this.name;
}

a.listen(process.env.PORT||10000);