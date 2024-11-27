//document.addEventlistener()'DOMContentLoader', () => 
    
const baseUrl ="http://localhost: 5500";
const authSection = document.getElementById("auth-section");
const taskSection = document.getElementById("tasks-section");

const taskForm = document.getElementById("create-task-form");
const taskList = document.getElementById("task-list");
const loginForm = document.getElementById("login-form");
const taskFilter = document.getElementById("task-filter")
const registerForm = document.getElementById("register-form");
const logoutButton = document.getElementById("logoutButton");
let token = null;

// Authentication
auth.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email  = document.getElementById("email").value;

    try{
        const response = await fetch('${baseUrl}/auth/login', {
            method: "POST",
            headers: {"content-Type": "application/json"},
            body: JSON.stringify({username, password, email}),
        
        });
        const data = await response.json();
        if (response.ok) {
            token = data.token;
            authSection.style.display ="none";
            taskSection.style.display = "block";
            loadTasks();
        
        }
        else{
            alert(data.message);
        }
        }
        catch(err) {
            console.error("Error logging in", err);
        }
    
});
registerForm.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    try{
        const response = await fetch('${baseUrl}/auth/register',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password, email}),
             
        });
        const data = await response.json();
        alert(data.message);
    }
    catch(err) {
        console.error("Error registering:" , err);
    }
});

//Load task
async function loadTask() {
try{
    const response = await fetch('${baseUrl}/tasks', {
        headers: {Authorization: 'Bearer ${token}'},
    });
    const tasks = await response.json();
    taskList.innerHTML ="";
        tasks.forEach((task) => addtasKToUI(task));
}

catch(err){
    console.error("Error loading tasks:", err);
}
}
//Add task
taskForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    const title = document.getElementById("task-title").value;
    const description = document.getElementById("task-desc").value;
    const deadline = document.getElementById("task-deadline").value;
    const priority = document.getElementById("task-priority").value;

    try{
        const response = await fetch('${baseUrl}/tasks',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization : 'Bearer ${token}',
            },
            body:JSON.stringify({ title, description, deadline, priority}),
        });
        const newTask = await response.json();
        addtaskToUI(newtask);
    }
    catch(err) {
        console.error("Errror adding task:", err);
    }
});
// Add task to UI 
function addTaskToUI(task) {
    const li = document.createElement("li");
    li.textContent = '${task.title} (Priority: ${task.priority}, Deadline: ${task.deadline})';
    taskList.appendChild(li);
}
//logout
logoutButton.addEventListener("click", () => {
    token = null;
    authSection.style.display = "block";
    taskSection.style.display = "none";

});


    

    
    
    
    

   
                


            

        
    

