function returnToHomePage() {
    const button = document.querySelector('#button-return')
    button.addEventListener('click', () => {
        window.location.replace('../../index.html');
    })
}
returnToHomePage()