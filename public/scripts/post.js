var deleteBtn = document.getElementById("deleteBtn");
var updateBtn = document.getElementById("updateBtn");
var formPost = document.getElementById("formPost");

async function deletePost() {
  const response = await fetch(`/dashboard/post/${formPost.dataset.id}`, {
    method: "DELETE",
    body: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(`Ocurrio un error al eliminar registro : ${formPost.dataset.id}`);
  }
}

async function updatePost() {
  const title = document.getElementById("textTitle").value;
  const content = document.getElementById("textContent").value;

  const response = await fetch(`/dashboard/post/${formPost.dataset.id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(`Ocurrio un error al actualizar registro : ${formPost.dataset.id}`);
  }
}

deleteBtn.addEventListener("click", deletePost);
updateBtn.addEventListener("click", updatePost);
