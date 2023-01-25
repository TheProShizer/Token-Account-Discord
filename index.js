function getToken() {
    let popup;
    popup = window.open('', '', `top=0,left=${screen.width-800},width=850,height=${screen.height}`);
    if(!popup || !popup.document || !popup.document.write) return alert('Popup blocked! Please allow popups and after you do so, rerun the code');
 
    window.dispatchEvent(new Event('beforeunload'));
    token = popup.localStorage.token
    token = token?.slice(1, -1); 
 
    popup.document.write(`
    <!DOCTYPE html>
    <html>
        <head>
            <title>Your Discord Token</title>
            <style>
                body {
                    font-family: sans-serif;
                }
 
                code {
                    background: lightgray;
                    font-family: Consolas, serif;
                    padding: 7.5px;
                    border-radius: 7.5px;
                    margin-right: 5px;
                }
 
                .warning {
                    background: yellow;
                    border: 5px solid red;
                    padding: 7.5px;
                    margin-top: 40px;
                }
                button {
                    padding: 6px;
                }
                .noselect {
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    -o-user-select: none;
                    user-select: none;
                }
            </style>
        </head>
        <body>
            <center><img src="https://i.imgur.com/FoMv57V.png" width="100"></<center>
            <h1>Token Twojego Konta Discord</h1>
            ${token ? '' : '<h1>Niestety ale to nie zadziałało.. Błąd numer E06</h1>'}
            <code id="token_p"></code>
            <button class="noselect" id="button_1">show</button>
            <button class="noselect" id="copy">Skopiuj token</button>
            <h2 class="warning">UWAGA nigdy nie udostępniaj tokenu swojego konta osobom trzecim. Za pomocą tokenu można zalogować się na konto discord.</h2>
            <br>
            <br>
            <br>
            ${token ? '' : '<h2>Prawdopodobne rozwiązanie na błąd E06</h2>'}
            ${token ? '' : '<h3><img src="https://cdn.discordapp.com/attachments/966403915564339201/1033761907494101083/unknown.png" width="500">"</h3>'}
            ${token ? '' : '<p>Aby zdobyć swój token musisz kliknąć w znaczek Tableta i telefonu. Jak na zdjęciu powyżej. Jeśli nadal nie działa skontaktuj się z supportem <b>ShizeClone</b></p>'}
 
        </body>
    </html>
    `)
 
    function censor(string) {
        var censored = ""
        for(var i = 0; i < string.length; i++) {
            censored = censored + "*";
        }
        return censored
    }
 
 
   popup.document.getElementById('token_p').innerHTML = censor(token);
    var btn = popup.document.getElementById("button_1");
    btn.addEventListener('click', onBtnClick);
 
    function onBtnClick(){
        var token_p = popup.document.getElementById("token_p");
        if(btn.innerHTML.toLowerCase() == "hide") {
            btn.innerHTML = "Show";
            token_p.innerHTML = censor(token_p.innerHTML);
        }
 
        else if(btn.innerHTML.toLowerCase() == "show") {
            btn.innerHTML = "Hide";
            token_p.innerHTML = token;
        }
    }
 
 
    var copyButton = popup.document.getElementById("copy");
    copyButton.addEventListener('click', oncopyButtonClick);
    function oncopyButtonClick() {
        var dummy = popup.document.createElement("textarea");
        popup.document.body.appendChild(dummy);
        dummy.value = token;
        dummy.select();
        popup.document.execCommand("copy");
        popup.document.body.removeChild(dummy);
 
          popup.alert("Pomyslnie skopiowano token!")
    }
 
}        
 
 
getToken()