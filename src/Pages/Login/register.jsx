import React, { useState, useEffect } from 'react';
import "./login.css"


// fetch( 'https://domain.com/path/?param1=value1&param2=value2' )
// .then( response => response.json() )
// .then( response => {
// // Do something with response.
// } );


export default function Login() {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();

    function Login(user) {
        // fetch('http://localhost:8080/users/?username=DunoC&password=12345')

        fetch('http://localhost:8080/users/?' + "username=" + user.username + "&" + "password=" + user.password)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    response.json().then(function (data) {
                        console.log("Info get ", data);

                        if (data.length != 0) {
                            setToken("correcto");
                        }
                        else {

                            console.log("NOT DATA");
                        }
                        // setToken("correcto");


                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    async function loginUser(user) {

        let response = await fetch('http://localhost:8080/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

        // let result = await response.json();
        // alert(result.message);



    }

    const handleSubmit = async e => {
        e.preventDefault(); // previene la recarga de la web

        // console.log("Datos del Form ",username+"|"+password)


        // const token = await loginUser({
        // username,
        // password
        // });	

        const token = await Login({
            username,
            password
        });


    }



    if (!token) {
        return (
            <div className="Login">
                <h1 className="titel-login">Registrarse</h1>
                <form className="form-login" onSubmit={handleSubmit}>
                    <div className="container">
                        <label htmlFor="uname"><b>Nombre de Usuario</b></label>
                        <input type="text" placeholder="Ingrese nombre de usuario" name="uname" onChange={e => setUserName(e.target.value)} required />

                        <label htmlFor="psw"><b>Contraseña</b></label>
                        <input type="password" placeholder="Ingrese Contraseña" name="psw" onChange={e => setPassword(e.target.value)} required />
                        <label htmlFor="psw"><b>Repetir Contraseña</b></label>
								<input type="password" placeholder="Ingrese Contraseña" name="psw" onChange={e => setPassword(e.target.value)} required />

                        <button type="submit">Registrarse</button>
                    </div>
                </form>
            </div>
        )
    }

    return (

        <div className="Login">
            <h2 className="titel-login">Usuario Correcto</h2>
        </div>



    );



}