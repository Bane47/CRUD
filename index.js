function render(){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://localhost:3000/Patient");
    xhttp.send();               //sending the request

    xhttp.onreadystatechange= function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            var trHTML="";
            const objects = JSON.parse(this.responseText);
            for(let object of objects){
trHTML += "<tr>";
trHTML += "<td>"+object["id"]+"</td>";
trHTML += '<td><img width="50px" src="' +
object["PatientImage"] +
'" class="avatar"></td>';;
trHTML += "<td>"+object['PatientName']+"</td>";
trHTML += "<td>"+object['Age']+"</td>";
trHTML += "<td>"+object['Sex']+"</td>";
trHTML += "<td>"+object['VisitingDate']+"</td>";
trHTML += "<td>"+object['Complaint']+"</td>";
trHTML += '<td><button type="button" class="btn btn-secondary" onclick="showUserEditBox('+object["id"]+')">Edit</button>';
trHTML += '<button type="button" class="btn btn-danger" onclick="userDelete('+object["id"]+')">Delete</button></td>';
trHTML += '</tr>';

            }
document.getElementById("mytable").innerHTML=trHTML;
        }
    }
}

render();

function showUserCreateBox(){
    Swal.fire({
        title: "Create user",
        html:
        '<input id="id" type="hidden">' +
        '<input id="PatientName" class="swal2-input" placeholder="Name">'+
        '<input id="Age" class="swal2-input" placeholder="Age">'+
        '<input id="Sex" class="swal2-radio" >'+
        '<input id="VisitingDate" class="swal2-input" placeholder="Date">'+
        '<input id="Complaint" class="swal2-input"placeholder="Complaint">',
        preConfirm: () =>{
            userCreate();
            return false;
        },
    });
}

function userCreate(){
   const  pname = document.getElementById("PatientName").value;
   const age = document.getElementById("Age").value;
   const sex = document.getElementById("Sex").value;
   const visitingdate = document.getElementById("VisitingDate").value;
   const complaint = document.getElementById("Complaint").value;

   const xhttp = new XMLHttpRequest();
   xhttp.open("POST","http://localhost:3000/Patient");
   xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
   xhttp.onreadystatechange = function (){
    if(this.readyState == 4 && this.status == 200){
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        render();
    }
}
   xhttp.send(
    JSON.stringify({
        PatientName:pname,
        Age:age,
        Sex: sex,
        VisitingDate:visitingdate,
        Complaint:complaint,
        PatientImage:"https://www.melivecode.com/users/1.png",
    })
   );

}

function showUserEditBox(id){
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("Get",`http://localhost:3000/Patient/${id}`);
    xhttp.send();
    xhttp.onreadystatechange= function (){
        if(this.readyState==4 && this.status == 200){
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            Swal.fire({
                title:"Edit User",
                html:
                '<input id="id" type="hidden" value="'+`objects[$(id)]`+'">'+
                '<input id="PatientName" class="swal2-input" placeholder="Name" value="'+
                objects["PatientName"]+
                '">'+
                '<input id="Age" class="swal2-input" placeholder="Age" value="'+objects["Age"]+'">'+
                '<input id="Sex" class="swal2-input" placeholder="Sex" value="'+objects["Sex"]+'">'+
                '<input id="VisitingDate" class="swal2-input" placeholder="VisitingDate" value="'+objects["VisitingDate"]+'">'+
                '<input id="Complaint" class="swal2-input" placeholder="Enter your Complaint" value="'+objects["Complaint"]+'">',
                preconfirm:() => {
                    userEdit(id);
                },
            });
        }
    }
}

function userEdit(id){
    const  pname = document.getElementById("PatientName").value;
   const age = document.getElementById("Age").value;
   const sex = document.getElementById("Sex").value;
   const visitingdate = document.getElementById("VisitingDate").value;
   const complaint = document.getElementById("Complaint").value;
 
   console.log(id);
   console.log(pname);
   const xhttp = new XMLHttpRequest();
   xhttp.open("PUT",`http://localhost:3000/Patient/${id}`);
   xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
   xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status == 200){
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects["message"]);
        render();
    }
   };
   xhttp.send(
    JSON.stringify({
        PatientName:pname,
        Age:age,
        Sex:sex,
        VisitingDate:visitingdate,
        Complaint:complaint,
        PatientImage:"https://www.melivecode.com/users/1.png"

    })
   );
  
}

function userDelete(id){
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE",`http://localhost:3000/Patient/${id}`);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if(this.readyState==4){
            const objects = JSON.parse(this.responseText);
            Swal.fire({
                title:"Do you want to delete this?",
                text: "You will not be able to revert this!",
                type: 'Warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes , delete it!'
            }).then((result)=>{
                if(result.value){
                    objects["message"];
                }
                
            })
        }
    };
}