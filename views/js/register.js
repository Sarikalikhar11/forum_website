let passInput = document.getElementById('password');
let cpassInput = document.getElementById('cpassword');
let pass_validation = document.getElementById('password_validation');

function matchPassword(event) {
  let password = passInput.value;
  let cpassword = cpassInput.value;
  console.log(cpassword, password);
  if (password && cpassword) {
    if (password === cpassword) {
      pass_validation.style.display = 'block';
      pass_validation.style.color = '#198754';
      pass_validation.innerHTML = 'password is match';
    } else {
      pass_validation.innerHTML = "password doesn't match";
      pass_validation.style.display = 'block';
      pass_validation.style.color = 'red';
    }
  }
}
passInput.addEventListener('keyup', matchPassword);
cpassInput.addEventListener('keyup', matchPassword);
