let socket = io();

document.getElementById("form").onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const text = document.getElementById("text").value;
    const date = (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString();

    try{
        /*const res = await fetch("/sendmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, text, date})
        });*/

        socket.emit("chat message", {username, text, date});
        
    }
    catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("/getall");
    const json = await res.json();
    
});

socket.on("chat message", (msg) => {
    let div = document.createElement("div");
    let h1 = document.createElement("h1");
    let p = document.createElement("p");
    let p2 = document.createElement("p");

    h1.innerHTML = msg.username;
    p.innerHTML = msg.text;
    p2.innerHTML = msg.date;

    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(p2);

    document.getElementById("messages").appendChild(div);
});