//Data

// Element ref
const Menu_icon = document.querySelector("#menu_icon");
const body = document.querySelector('body');
const logo= document.querySelector('#logo');
const login = document.querySelector("#login");
let beforeHeight = body.scrollHeight;

const toggle_menu = function(event) {
	const body = document.querySelector('body');
	const Menu = document.querySelector("#Menu");
	const Nav = document.querySelector('#Nav');
	const Login = document.querySelector('#login');
	const Content = document.querySelector('#Content');
	const login = document.querySelector("#login");
	const User_Info = document.querySelector("#User_Info");

	if (Menu.classList.contains("hidden")){
		setTimeout(()=>{
			Menu.classList.remove("hidden");
			Login.classList.add("menuOn");
			Content.classList.add("menuOn");
			Nav.classList.add("menuOn");
			Menu.style.height= body.scrollHeight+"px";
			setTimeout(()=>{
				User_Info.classList.remove("hidden");
			},300);
		},300);
	} else{
		setTimeout(()=>{
			Menu.classList.add("hidden");
			Nav.classList.remove("menuOn");
			Content.classList.remove("menuOn");
			Login.classList.remove("menuOn");
			Menu.style.height= beforeHeight+"px";
		})
	}

};

if(Menu_icon != null){
	Menu_icon.addEventListener('click',toggle_menu);
}

if(login != null){
	login.addEventListener('click',()=>{
		window.location.href="/login";		
	});	
}

logo.addEventListener('click',()=>{
	window.location.href="/";
});
