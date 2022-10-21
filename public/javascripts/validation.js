const form = document.getElementById('create-form')
const createNewBtn = document.getElementById('create-new-btn')

form.addEventListener('submit', (e) => {
  form.classList.add('was-validated')
  if (!form.checkValidity()) {
    e.preventDefault()
    e.stopPropagation()
  }
})
