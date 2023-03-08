
 
async function get_region_list (){
 	let response = await axios.get('/api/cinema?list')
 	region_list = response.data.results.filter(r=> r!= 'region'&& r!='region\r');

 	make_regionList();
	return;
}

async function get_cinema_list(region){
 	let response = await axios.get(`/api/cinema?region=${region}`)
 	cinema_list = response.data.results;
 	remove_movieList();
 	remove_cinemaList();
 	remove_dateList();
 	setTimeout(()=>{
 		make_cinemaList(cinema_list);
 	}, 100);
	return;
}

async function get_movie_list(cinema_id){
	let response = await axios.get(`/api/cinema/${cinema_id}?movielist`);	
	movie_list = response.data.results;
	remove_movieList();
	remove_dateList();
	setTimeout(()=>{
		make_movieList();
	}, 100);
	return;
}

async function get_date_list(cinema_id, movie_id){
	let response = await axios.get(`/api/cinema/${cinema_id}?movieid=${movie_id}&datelist`);
	date_list = response.data.results.map(r=>new Date(r["date"]));
	remove_dateList();
	setTimeout(()=>{

		make_dateList();
	}, 100);
	return;
}

async function get_screen_list(cinema_id, movie_id, date){
	let response = await axios.get(`/api/cinema/${cinema_id}?movieid=${movie_id}&date=${date}&screenlist`);
	screen_list = response.data.results;
	remove_screenList();

	setTimeout(()=>{
		make_screenList(screen_list);
	},100);
}



const goPayment = document.querySelector("#goPayment");
function check() {
	if(fr.info_m.value == "") {
	  alert("인원수 선택하세요");
	  return false;
	}else if( seat_list.length!= mem_ayp[0]+mem_ayp[1]+mem_ayp[2]) {
		alert("인원수만큼 좌석 선택 하세요");
	return false;

	}else {return true;}
  
  }
  
const make_seatChart = function (seats) {
	const SeatChart = document.querySelector('#SeatChart');
	for (i = 0; i < seats.length; i++) {
		let newRow = document.createElement('div');
		newRow.classList.add('seat-row');
		SeatChart.appendChild(newRow);
		let newSeat = document.createElement('div');
		let newSeatText = document.createTextNode(String.fromCharCode(65 + i));
		newSeat.appendChild(newSeatText);
		newSeat.classList.add('empty_seat')
		newRow.appendChild(newSeat);
		for (j = 0; j < seats[i].length; j++) {
			let newSeat = document.createElement('div');
			let newSeatText;
			if (seats[i][j] == 1) {
				newSeatText = document.createTextNode(j);
				newSeat.classList.add('seat');
				newRow.appendChild(newSeat);
				newSeat.addEventListener('click', function (event) {
					if (mem_ayp[0] + mem_ayp[1] + mem_ayp[2] >= seat_list.length) {
						newSeat.classList.toggle("select_seat");
						var str1 = newSeat.parentNode.children[0].textContent;
						var str2 = newSeat.textContent;
						var str = " ".concat("",str1.concat(" - ", str2))
						var s = 0;
						for (let k = 0; k < seat_list.length; k++) {
							if (seat_list[k] == str) {
								seat_list.splice(seat_list.indexOf(str), 1);
								s = 1;
							}
						}
						if (s == 0) seat_list.push(str)
						if (mem_ayp[0] + mem_ayp[1] + mem_ayp[2] < seat_list.length) {
							newSeat.className = "seat";
							seat_list.pop();
						}
					}
					text = document.createTextNode(seat_list);
					seat_list.sort();
					document.getElementById("seats_info").textContent ="seats: "+ seat_list;
					document.getElementById("info_s").value = seat_list ;
					

				});

			}
			else if (seats[i][j] == 2) {
				newSeatText = document.createTextNode(j);
				newSeat.classList.add('seat');
				newSeat.classList.add('disable');
				newRow.appendChild(newSeat);
			}
			else {
				newSeatText = document.createTextNode(" ");
				newSeat.classList.add('empty_seat');
				newRow.appendChild(newSeat);
			}
			newSeat.appendChild(newSeatText);
		}
		newSeat = document.createElement('div');
		newSeatText = document.createTextNode(" ");
		newSeat.appendChild(newSeatText);
		newSeat.classList.add('empty_seat')
		newRow.appendChild(newSeat);
	}
}

const make_memset = function () {
	const mem = document.getElementsByClassName("memset");
	for (j = 0; j < 3; j++) {
		for (i = 0; i <= 8; i++) {
			let newItem = document.createElement('li');
			let newItem_text = document.createTextNode(i);
			newItem.appendChild(newItem_text);
			if (i == 0) {
				newItem.className = "selected"
			}
			newItem.addEventListener('click', function (event) {
				for (var k = 1; k <= 9; k++) {
					newItem.parentNode.children[k].className = "";
				}
				newItem.className = "selected";

				if (newItem.parentNode.children[0].textContent == "일반") {
					mem_ayp[0] = parseInt(newItem.textContent);
				} else if (newItem.parentNode.children[0].textContent == "청소년") {
					mem_ayp[1] = parseInt(newItem.textContent);
				} else {
					mem_ayp[2] = parseInt(newItem.textContent);
				}
				document.getElementById("info_m").value = mem_ayp;
			});
			mem[j].appendChild(newItem);
		}
	}
}

const make_reservation_info = function (i, textContent, info) {
	const Info = document.querySelector("#reservation_info");
	Info.children[i].children[0].textContent = textContent + ": " + info;
}

const make_regionList = function () {
	const RegionList = document.querySelector("#region-list");
	for (i = 0; i < region_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(region_list[i]);
		newItem.name = region_list[i];
		newItem.appendChild(newItem_text);

		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < RegionList.childElementCount; k++) {
				RegionList.children[k].className = "";
			}
			this.className = "selected";
			reservation_info["region"] = this.name;

			get_cinema_list(this.name);

		});
		RegionList.appendChild(newItem);
	}
}

const make_cinemaList = function (cinema_list) {
	const CinemaList = document.querySelector("#cinema-list");
	for (i = 0; i < cinema_list.length; i++) {
		let newItem = document.createElement('li');
		let newItem_text = document.createTextNode(cinema_list[i].cinema_name);
		newItem.cinema_id = cinema_list[i].cinema_id;

		newItem.appendChild(newItem_text);
		if (cinema_list[i] == reservation_info[1]) {
			newItem.className = "selected";
		}
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < CinemaList.childElementCount; k++) {
				CinemaList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info["cinema_id"] = this.cinema_id;

			get_movie_list(this.cinema_id);
		});
		CinemaList.appendChild(newItem);
	}
}
const remove_cinemaList = function () {
	const CinemaList = document.querySelector("#cinema-list");
	while (CinemaList.childElementCount > 0) {
		CinemaList.removeChild(CinemaList.lastChild);
	}
}

const make_movieList = function () {
	const MovieList = document.querySelector("#movie-list");
	for (i = 0; i < movie_list.length; i++) {
		let newItem = document.createElement('li');
		newItem.setAttribute("style", `background-image: url(${movie_list[i].movie_img})`);
		let newItem_text = document.createTextNode(movie_list[i].movie_name);
		newItem.movie_id = movie_list[i].movie_id;
		newItem.movie_name = movie_list[i].movie_name;

		if (movie_list[i] == reservation_info[2]) {
			newItem.className = "selected";
		}

		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < MovieList.childElementCount; k++) {
				MovieList.children[k].className = "";
			}
			newItem.className = "selected";
			reservation_info["movie_id"] = this.movie_id;

			get_date_list(reservation_info["cinema_id"], this.movie_id);
		});
		MovieList.appendChild(newItem);
	}

}

const remove_movieList = function(){
	const MovieList = document.querySelector("#movie-list");
	while(MovieList.childElementCount > 0){
		MovieList.removeChild(MovieList.lastChild);
	}
}

const make_dateList = function () {
	const DateList = document.querySelector("#date-list");
	for (i = 0; i < date_list.length; i++) {
		let newItem = document.createElement('li');
		var dateString = date_list[i].getFullYear()+"-"+(date_list[i].getMonth()+1).toString().padStart(2,'0') +"-"+date_list[i].getDate().toString().padStart(2,'0');
		let newItem_text = document.createTextNode(dateString);
		newItem.date= dateString;
		newItem.appendChild(newItem_text);
		
		newItem.addEventListener('click', function (event) {
			for (var k = 0; k < DateList.childElementCount; k++) {
				DateList.children[k].className = "";
			}
			newItem.className = "selected";
			
			reservation_info["date"] = this.date;
			document.getElementsByClassName("date").value = reservation_info["date"];

			get_screen_list(reservation_info["cinema_id"], reservation_info["movie_id"], this.date);

		});
		DateList.appendChild(newItem);
	}
}

const remove_dateList = function(){
	const DateList = document.querySelector("#date-list");
	while(DateList.childElementCount > 0){
		DateList.removeChild(DateList.lastChild);
	}

}


const make_screenList = function (screen_time_list) {
	const ScreenList = document.querySelector("#screen-list");

	let map = new Map();
	for (let i = 0; i < screen_time_list.length; i++) {

		let screen_no = screen_time_list[i].screen_no;
		if(! map.has(screen_no)){
			map.set(screen_no, []);

			let newgroup = document.createElement("ul");
			let newgroup_name = document.createElement("h5");
			let newgroup_name_text = document.createTextNode(screen_no);

			newgroup_name.appendChild(newgroup_name_text);
			newgroup.appendChild(newgroup_name);
			ScreenList.appendChild(newgroup);
			newgroup.screen_no = screen_no;
		}

		let arr = map.get(screen_no);
		arr.push(screen_time_list[i]);
	}
		
	
	const ScreenGroupList = document.querySelectorAll("#screen-list > ul");
	
	for(let i =0; i<map.size; i++){
		let newgroup = ScreenGroupList[i];
		let arr = map.get(newgroup.screen_no);

		for(let j=0; j<arr.length; j++){
			let newItem = document.createElement("li");
			let startTime = document.createElement("h6");
			let leftedCapcity = document.createElement("h6");
			leftedCapcity.classList.add('left');
			let startTime_text = document.createTextNode(arr[j].start_time);
			let leftedCapcity_text = document.createTextNode(123);
			startTime.appendChild(startTime_text);
			leftedCapcity.appendChild(leftedCapcity_text);
			newItem.appendChild(startTime);
			newItem.appendChild(leftedCapcity);
			newItem.screen_no = newgroup.screen_no;
			newItem.start_time = arr[j].start_time;
			newItem.box_office_id = arr[j].box_office_id;
			newgroup.appendChild(newItem);

			
			newItem.addEventListener('click', function (event) {
				for (var l = 1, s = 0; s < ScreenList.length; l++) {
					ScreenList[s].children[l].className = "";
					if (l == ScreenList[s].childElementCount - 1) { s++; l = 0; }
				}
				newItem.className = "selected";
				reservation_info["screen_no"] = this.screen_no 
				reservation_info["start_time"] = this.start_time;
				reservation_info["box_office_id"] = this.box_office_id;
				document.getElementsByClassName("screen_no").value = reservation_info["screen_no"];
				document.getElementsByClassName("show_start_time").value = reservation_info["start_time"];
			});
		}
	}

}

const remove_screenList = function(){
	const ScreenList = document.querySelector("#screen-list");
	while(ScreenList.childElementCount > 0){
		ScreenList.removeChild(ScreenList.lastChild);
	}

}


var region_list;
var cinema_list;
var movie_list;
var date_list;
var screen_list;
var reservation_info = {}
var reserv_seats = [[1,1,1,0,1,1,1,1,1,0,1,1,1],[1,1,1,0,1,1,1,1,1,0,1,1,1],[1,1,1,0,1,1,1,1,1,0,1,1,1],[1,1,1,0,1,1,1,1,1,0,1,1,1]];

var seat_list = new Array();
var mem_ayp = [0, 0, 0];
make_seatChart(reserv_seats);
make_memset();


get_region_list();