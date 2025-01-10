

const supabaseUrl = 'https://idigzwnswohnurkvhcnw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkaWd6d25zd29obnVya3ZoY253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1Mjk4OTksImV4cCI6MjA1MjEwNTg5OX0.S3guuW8kHmVgEb5waNb5PlbD9b4MDnkGm6-1HCWdKY0'
const supabasePro = supabase.createClient(supabaseUrl, supabaseKey)
// console.log(supabasePro)



const inputs = document.querySelector('.inputs')
// console.log(inputs)
const listmain =document.querySelector('.maindiv')
// console.log(listmain)
const adatodobtn =document.querySelector('.Add') 
let targetliText;





async function addTodo(ele){
    const tast = inputs.value
    // console.log(inpval)


    const { error } = await supabasePro
    .from('todo')
    .insert({ tast : tast })
  
  




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
     li.innerHTML = tast
     
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
      // console.log(inputs.parentElement.children[1]);
  adatodobtn.innerHTML = "Edite Now";
    });
    
    
  
    }

   
  
  
  

  

}

async function fetchTodo(){
  const { data, error } = await supabasePro
  .from('todo')
  .select()
// console.log(data)

for (var i =0; i< data.length; i++){
  // console.log(data[i])
const todo = data[i]
// console.log(todo)


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
 li.innerHTML = data[i].tast
 
 
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
    
   
 

      if (btn1.checked) {
        li.classList.add("libtn");
   comnpleteTodo(todo.id,true)
      

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "compelete Todo",
            showConfirmButton: false,
            timer: 1500
            
          });
    } else {
       li.classList.remove('libtn')
   comnpleteTodo(todo.id,false)

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
 
  // console.log(todo.id)
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
            deleTodo(todo.id)
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



li.addEventListener("click", (e) => {
  console.log(e);
  targetliText = e.target;
  console.log(e.target);
  inputs.value = e.target.innerHTML;
  // console.log(inputs.parentElement.children[1]);
adatodobtn.innerHTML = "Edite Now";
});



}


}



 
}

async function comnpleteTodo(id,done) {
  const { error } = await supabasePro
  .from('todo')
  .update({ done: 'done' })
  .eq('id', id)

}


async function deleTodo(id) {
  const response = await supabasePro
  .from('todo')
  .delete()
  .eq('id', id)

}
fetchTodo()