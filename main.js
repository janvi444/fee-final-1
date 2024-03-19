const modal = document.querySelector('.modal')
const loginBtn = document.querySelector('.login-btn')
const closeBtn = document.querySelector('.close')

loginBtn.addEventListener('click', openModal)
closeBtn.addEventListener('click', closeModal)
window.addEventListener('click', outsideClick)

document.getElementById("knowMoreBtn").addEventListener("click", function() {
    window.location.href = "https://jasleengujral01.github.io/fee-project11/";
});

function openModal() {
    modal.style.display = 'block'
}

function closeModal() {
    modal.style.display = 'none'
}

function outsideClick(e) {
    if(e.target == modal){
        closeModal()
    }
}