window.addEventListener("load", add)

function add() {
    const table = document.getElementById("table");
    if( window.localStorage.getItem("table")){
        const score = window.localStorage.getItem("table");
        const jsonScore = JSON.parse(score);

        const jsonFilter = Object.keys(jsonScore).sort(function(a,b){return jsonScore[a]-jsonScore[b]})
        table.innerHTML = `<TR>
        <TD width="10%" align = "center"><h1> № </h1></TD>
        <TD align = "center"><h1>Имя</h1></TD>
        <TD align = "center"><h1>Время</h1></TD>
        </TR>`
        let i = 1;
        for (let name of jsonFilter){
            let item = `<TR align = "center">
            <TD>`+ i +`</TD>
            <TD>` + name + `</TD>
            <TD>` + jsonScore[name] + `</TD>
            </TR>`;
            table.innerHTML += item;
            i++;
        }
        table.innerHTML += "</table>"
    } else {
        return;
    }
}