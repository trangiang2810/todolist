window.addEventListener("load", async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else {
    console.error("Web3 provider not found");
  }
});

async function addTask() {
  const taskInput = document.getElementById("taskInput").value;

  try {
    const accounts = await web3.eth.getAccounts();
    const todoListContract = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: "createTask",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      "0xYOUR_CONTRACT_ADDRESS"
    );

    await todoListContract.methods
      .createTask(taskInput)
      .send({ from: accounts[0] });
    alert("Task added successfully!");
  } catch (error) {
    console.error("Error:", error);
    // alert("Error: " + error.message);
  }
  displayTask(taskInput);
}

function displayTask(task) {
  let taskList = document.getElementById("taskList");
  let li = document.createElement("li");
  li.textContent = task;
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  };
  li.appendChild(checkbox);
  taskList.appendChild(li);
}
