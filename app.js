

const supabaseUrl = 'https://mzysocgizspbhlfzorhk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eXNvY2dpenNwYmhsZnpvcmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNzM0NDEsImV4cCI6MjA1MTg0OTQ0MX0.pLRCtLL-8nr4MLUu32E5y5NWMYroI1RRmdCDJXfwl-o"
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey)
console.log(supabasePro)



const inputs = document.querySelector('.inputs')
console.log(inputs)
const listmain =document.querySelector('.maindiv')
console.log(listmain)
const adatodobtn =document.querySelector('.Add') 
let targetliText;




let dumu ;
async function addTodo(ele){
    // const inpval = inputs.value
    // console.log(inpval)
    Swal.fire({
      title: "Done!",
      icon: "success",
      draggable: true,
    });
    if (adatodobtn.innerHTML === "Edite Now") {
      console.log(targetliText);
      targetliText.innerHTML = inputs.value;
     adatodobtn.innerHTML = "Add";
    
    
        inputs.value = ""
    }else{
      const list = document.createElement("div")
      list.classList.add('list')  
    
    
        const ul = document.createElement('ul')
        const li = document.createElement('li')
        li.innerHTML = inputs.value 
        li.classList.add('litext')
     
     
        ul.appendChild(li)
        const divbtn = document.createElement('div');
        divbtn.classList.add("btns")
        const btn1 = document.createElement('input')
        btn1.setAttribute('type','checkbox')
        // btn1.innerHTML = "&#10003;"
        const btn2 = document.createElement('button')
        btn2.innerHTML = "&#10006;"
    
    divbtn.appendChild(btn1)
    divbtn.appendChild(btn2)
    
    
    
    list.appendChild(ul)
    list.appendChild(divbtn)
    
    listmain.appendChild(list)
    
    inputs.value = ""
    
    
    
    btn1.addEventListener("click", () => {
        // li.classList.add("libtn");
        
          if (btn1.checked) {
            li.classList.add("libtn");
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "compelete Todo",
                showConfirmButton: false,
                timer: 1500
              });
        } else {
           li.classList.remove('libtn')
           Swal.fire({
            position: "top-end",
            icon: "error",
            title: " Not compelete Todo",
            showConfirmButton: false,
            timer: 1500
          });
        }
    
      });
    
    
    btn2.addEventListener('click',()=>{
      
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                list.remove()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    })
    if(li.innerHTML == ""){
       
            Swal.fire({
                title: "Enter a Todo",
                icon: "error",
                draggable: true
              });
    
    list.remove()
    }
    
    let set = ele
    console.log(set)
    
    li.addEventListener("click", (e) => {
      console.log(e);
      targetliText = e.target;
      console.log(e.target);
      inputs.value = e.target.innerHTML;
      console.log(inputs.parentElement.children[1]);
      inputs.parentElement.children[1].innerHTML = "Edite Now";
    });
    
    
  
    }

   
  
  
  

  

}

