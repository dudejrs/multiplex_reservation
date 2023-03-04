// Data
// const movie =[ 
// 	[{movie_id : 1, movie_img : "", movie_name : "Jocker"}, {movie_id : 1, movie_img : "", movie_name : "Parasite"}, {movie_id : 1, movie_img : "", movie_name : "Shrek"}, {movie_id : 1, movie_img : "", movie_name : "HarryPotter"}, {movie_id : 1, movie_img : "", movie_name : "Walkingdead"}],
// 	[{movie_id : 1, movie_img : "", movie_name : "Parisite"},{movie_id : 1, movie_img : "", movie_name : "HarryPotter"},{movie_id : 1, movie_img : "", movie_name : "Jocker"},{movie_id : 1, movie_img : "", movie_name : "Walkingdead"},{movie_id : 1, movie_img : "", movie_name : "Shrek"}]
// ];


// let movie_selected = {
// 	genre : "Horror/ Comedy",
// 	ratio : 4,
// 	releaseDate : "2019.99.99",
// 	country :  "Korea",
// 	running_time : 130,
// 	movie_director : "Son HeungMin",
// 	actors : ["Park SeongSoo", "Park JaeSeon", "Oh HyeongSeo", "Woo HyeongSeok", "Jeon JongHa","Kim DeokYoung"],
// 	agency : "CJEnt",
// 	translator : "",
// 	age_limit : 15,
// 	number_of_spectators : 123456789, 
// 	reservation_rates : 15
// };


// var req = new XMLHttpRequest();
// req.onreadystatechange = function(e){
// 	console.log(""+req.readyState + req.status);
// 	if( req.readyState == 4) {
// 		if( req.status == 200){
// 			console.log(req.response);
// 			movie_selected = req.response;
// 			if (req.response.type = "movie_selected"){
// 				setTimeout(()=>{
// 					remove_simpleInfo();
// 					make_simpleInfo();
// 					Content_backgroundImg.style.backgroundImage = `url(${movie_selected.movie_img})`;
// 				},800);
// 				}
// 			}
// 	}
// };
// req.responseType = "json";

// Ellement ref
const Movie = document.querySelectorAll('.movie')
const Movie_filter = document.querySelectorAll('#movie-filter > li')
const Movie_chart = document.querySelector('#Movie-chart');
const Content_background = document.querySelector('#Content-background');
const Content_backgroundImg = document.querySelector('#Content-background-img');
const Content = document.querySelector('#Content');
const moreInfo_btn = document.querySelector('#more');
const goReservation_btn = document.querySelector('#goReservation');
// const Menu_icon = document.querySelector("#menu_icon");

const make_movieContainer = function(element,index){
	const Movie_chart = document.querySelector('#Movie-chart');
	
	const container = document.createElement('div');
	container.classList.add('movie');
	container.value = element.movie_id;
	const image = document.createElement('div');
	image.classList.add('movie-image');
	image.style.backgroundImage = `url(${element.movie_img})`;
	const Info_container = document.createElement('div');
	Info_container.classList.add('Info_container');
	const name = document.createElement('h3');
	name.classList.add('movie_name');
	const nameText=document.createTextNode(element.movie_name);
	const rank= document.createElement("h3");
	rank.classList.add('rank');
	const rankText= document.createTextNode(index+1);

	Movie_chart.appendChild(container);
	container.appendChild(image);
	container.appendChild(Info_container);
	Info_container.appendChild(name);	
	Info_container.appendChild(rank);
	name.appendChild(nameText);
	rank.appendChild(rankText);
};

const make_movieChart = function(){
		movie[0].forEach((element,index)=>{
		make_movieContainer(element,index);
		});
		const Movie = document.querySelectorAll('.movie');
		Movie[0].classList.add('selected');
		make_simpleInfo();
		Movie.forEach((element)=>{
			element.addEventListener('click',change_select.bind(element));
		});

		Movie_filter.forEach((element,index)=>{
			element.addEventListener('click',()=>{
				const Movie = document.querySelectorAll('.movie');
				const Movie_img = document.querySelectorAll('.movie .movie-image');
				const Movie_name = document.querySelectorAll(".movie_name");
				const Movie_selected = document.querySelector(".movie.selected");
				const Movie_chart = document.querySelector("#Movie-chart");

				setTimeout(()=>{
					Movie.forEach((element,j)=>{
						if(j<movie[index].length){
						element.value = movie[index][j].movie_id;
						}						
					});
					Movie_name.forEach((element,j)=>{
						if(j<movie[index].length){
						element.innerHTML = movie[index][j].movie_name;
						}
					});
					Movie_img.forEach((element,j)=>{
						if(j<movie[index].length){
						element.style.backgroundImage = `url(${movie[index][j].movie_img})`;
						}
						change_selected_movie_Info(movie[index][0].movie_id);
					})
					})},500);
		
				remove_simpleInfo();
				document.querySelector('.movie.selected').classList.remove('selected');
				Movie[0].classList.add('selected');
				make_simpleInfo();
				Movie_chart.scrollLeft= 0;
			});
};

const make_simpleInfo = function(event){
	const Info_container = document.querySelector(".movie.selected .Info_container");

	const Info = document.createElement("div");
	Info.classList.add("Info");

	const genre = document.createElement("span");
	const releaseDate = document.createElement("span");
	const genreText =document.createTextNode(movie_selected.genre);
	const releaseDateText = document.createTextNode(new Date(movie_selected.release_date).toLocaleDateString());

	const ratio = document.createElement("div");
	let k = movie_selected.ratio;
	for(var i=0;i<5;i++){
		const newstar = document.createElement("div");
		const newstarinner = document.createElement("div");
		newstar.appendChild(document.createTextNode(" "));
		newstar.appendChild(newstarinner);
		newstar.classList.add('star');
		newstarinner.classList.add('starinner');
		if(k<1){
			newstarinner.style.transform="translateX("+Math.floor(k*10-10)+"px)";
		};
		k+=-1;
		ratio.appendChild(newstar);
	}
	
	genre.appendChild(genreText);
	releaseDate.appendChild(releaseDateText);
	
	Info_container.appendChild(Info);
	Info.appendChild(releaseDate);
	Info.appendChild(genre);
	Info.appendChild(ratio);

};

const make_detailedInfo = function(event){
	const Info_container = document.querySelector('.movie.selected.in-detail .Info_container');
	const Info = document.createElement("div");
	Info.classList.add("Info");

	const genre = document.createElement("p");
	const ratio = document.createElement("p");
	const releaseDate = document.createElement("p");
	const running_time = document.createElement("p");
	const country = document.createElement("p");
	const movie_director = document.createElement("p");
	const actors = document.createElement("ul");
	const agency = document.createElement("p");
	const translator = document.createElement("p");
	const age_limit = document.createElement("p");
	const number_of_spectators = document.createElement("p");
	const reservation_rates = document.createElement("p")

	const genreText =document.createTextNode("Genre : "+movie_selected.genre);
	const ratioText = document.createTextNode("Ratio :   ");
	const releaseDateText = document.createTextNode("Release Date :"+new Date(movie_selected.release_date).toLocaleDateString());
	const running_timeText = document.createTextNode("Running Time :"+movie_selected.running_time+ "분");
	const countryText = document.createTextNode("Country : "+movie_selected.country);
	const movie_directorText = document.createTextNode("Movie Director : "+movie_selected.director);
	const agencyText = document.createTextNode("Agency : "+movie_selected.agency);
	const translatorText = document.createTextNode("Translator :"+movie_selected.translator);
	const age_limitText = document.createTextNode("Age limit :"+movie_selected.age_restriction);
	const number_of_spectatorsText = document.createTextNode("Number of spectators :"+movie_selected.number_of_spectators);
	const reservation_ratesText = document.createTextNode("Reservation rates :"+movie_selected.reservation_rates);

	genre.appendChild(genreText);
	ratio.classList.add("ratio_container");
	ratio.appendChild(ratioText);
	let k = movie_selected.ratio;
	for(var i=0;i<5;i++){
		const newstar = document.createElement("div");
		const newstarinner = document.createElement("div");
		newstar.appendChild(document.createTextNode(" "));
		newstar.appendChild(newstarinner);
		newstar.classList.add('star');
		newstarinner.classList.add('starinner');
		if(k<1){
			newstarinner.style.transform="translateX("+Math.floor(k*10-10)+"px)";
		};
		k+=-1;
		ratio.appendChild(newstar);
	}
	releaseDate.appendChild(releaseDateText);
	running_time.appendChild(running_timeText);
	country.appendChild(countryText);
	movie_director.appendChild(movie_directorText);
	agency.appendChild(agencyText);
	translator.appendChild(translatorText);
	agency.appendChild(agencyText);
	age_limit.appendChild(age_limitText);
	number_of_spectators.appendChild(number_of_spectatorsText);
	reservation_rates.appendChild(reservation_ratesText);


	// const actors_string = movie_selected.main_actor;

	// const  actor_list = actors_string.split(",")


	// for(let i =0 ; i<actor_list.length;i++){
	// 	const actor = document.createElement("li");
	// 	const actorText = document.createTextNode("Actor : " + actor_list[i]);

	// 	actor.appendChild(actorText);
	// 	actors.appendChild(actor);
	// }
	
	
	Info.appendChild(genre);
	Info.appendChild(ratio);
	Info.appendChild(releaseDate);
	Info.appendChild(running_time);
	Info.appendChild(country);
	Info.appendChild(movie_director);
	Info.appendChild(agency);
	Info.appendChild(translator);
	Info.appendChild(agency);
	Info.appendChild(age_limit);
	Info.appendChild(number_of_spectators);
	Info.appendChild(reservation_rates);
	Info.appendChild(actors);
	Info_container.appendChild(Info);
}

const remove_simpleInfo = function(event){
	const Movie_selected = document.querySelector('.movie.selected .Info_container');
	Movie_selected.removeChild(document.querySelector('.Info'));
};

const remove_detailedInfo = function(event){
	const Movie_selected = document.querySelector('.movie.selected .Info_container');
	Movie_selected.removeChild(document.querySelector('.Info'));
}



const change_select = function(event){
	const Movie_chart = document.querySelector('#Movie-chart');
	const Movie = document.querySelectorAll('.movie');
	const more = document.querySelector("#more");
	remove_simpleInfo();
	document.querySelector('.movie.selected').classList.remove('selected');
	change_selected_movie_Info(this.value);	
	more.classList.add('changing');
	setTimeout(()=>{
		this.classList.add('selected');
		more.classList.remove('changing');
		make_simpleInfo();
		// Content_backgroundImg.style.backgroundImage = `url(${movie_selected.movie_img})`;
	},700);
};

const change_selected_movie_Info = function(movie_id){
	req.open("GET","/api/movie?movie_id="+ encodeURIComponent(movie_id),true);
	req.send();
};

const handle_more = function(){
	const Content = document.querySelector('#Content');
	const Content_backgroundImg =document.querySelector('#Content-background-img');
	const Movie_selected = document.querySelector('.movie.selected');
	const Movie_chart = document.querySelector('#Movie-chart');
	const more = document.querySelector('#more');
	Movie_chart.scrollLeft = 0;
	
	if(!Movie_selected.classList.contains('in-detail')){
		Movie_selected.classList.add('in-detail');
		Movie_chart.classList.add('in-detail');
		more.classList.add('in-detail');
		remove_simpleInfo();
		make_detailedInfo();
	} else{
		Movie_selected.classList.remove('in-detail');
		Movie_chart.classList.remove('in-detail');
		more.classList.remove('in-detail');
		remove_detailedInfo();
		make_simpleInfo();
	}

	setTimeout(()=>{
		Content_background.style.height =  Content.getBoundingClientRect().height+'px';
		Content_backgroundImg.style.height =  Content.getBoundingClientRect().height+'px';
	},100);

}



make_movieChart();

Content_backgroundImg.style.backgroundImage = `url(${movie_selected.movie_img})`;

moreInfo_btn.addEventListener('click', handle_more);


goReservation_btn.addEventListener('click', ()=>{
	window.location.href="/reserv/";
});



