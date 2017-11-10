const handleLogin = (e) => {
	e.preventDefault();

	$("#domoMessage").animate({width:'hide'},350);

	if($("#user").val() == '' || $("#pass").val() == '') {
		handleError("RAWR! Username or password is empty");
		return false;
	}

	console.log($("input[name=_csrf]").val());

	sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

	return false;	
};

const handleSignup = (e) => {
	e.preventDefault();

	$("#domoMessage").animate({width:'hide'},350);

	if($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
		handleError("RAWR! All fields are required");
		return false;
	}

	if($("#pass").val() !== $("#pass2").val()) {
		handleError("RAWR! Passwords do not match");
		return false;
	}

	sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

	return false;
};




const setup = (csrf) => {
	const loginButton = document.querySelector("#loginButton");
	const signupButton = document.querySelector("#signupButton");

	signupButton.addEventListener("click", (e) => {
		e.preventDefault();
		cretesSignupWindiw(csrf);
		return false;
	});

	loginButton.addEventListener("click", (e) => {
		e.preventDefault();
		createsLoginWindow(csrf);
		return false;
	});



const getToken = () => {
	sendAjax('GET', '/getToken', null, (result) => {
		setup(result.csrfToken);
	});
};

	createsLoginWindow(csrf); //default view
};



const SignupWindow = (props) => {
	return (
		<form id="signupForm"
			name="signupForm"
			onSubmit={handleSignup}
			action="/signup"
			method="POST"
			className="mainForm"
		>
		<label htmlFor ="username">Username: </label>
		<input id="user" type="text" name="username" placeholder="username"/>
		<label htmlFor="pass">Password: </label>
		<input id="pass" type="password" name="pass" placeholder="password"/>
		<label htmlFor="pass2">Password: </label>
		<input id="pass2" type="passwprd" name="pass2" placeholder="retype password"/>
		<input type="hidden" name="_csrf" value={props.csrf} />
		<input className="formSubmit" type="submit" value="Sign Up" />
		</form>
	);
};

const LoginWindow = (props) => {
	return (
	<form id="loginForm" name="loginForm"
		onSubmit={handleLogin}
		action="/login"
		method="POST"
		className="mainForm"
		>
		<label htmlFor="username">Username: </label>
		<input id="user" type="text" name="username" placeholder="username"/>
		<label htmlFor="pass">Password: </label>
		<input id="pass" type="password" name="pass" placeholder="password"/>
		<label htmlFor="pass2">Password: </label>
		<input id="pass2" type="password" name="pass2" placeholder="retype password"/>
		<input type="hidden" name="_csrf" value={props.csrf} />
		<input className="formSubmit" type="submit" value="Sign in" />
	</form>
		);
};

const createSignupWindow = (csrf) => {
	ReactDOM.render(
		<SignupWindow csrf={csrf} />,
		document.querySelector("#content")
		);
};

const createLoginWindow = (csrf) => {
	ReactDOM.render(
		<LoginWindow csrf={csrf} />,
		document.querySelector("#content")
		);
};

$(document).ready(function() {
	getToken();
});


