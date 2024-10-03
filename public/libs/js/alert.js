
function showSuccessAlert(message) {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: message,
    });
}

function showErrorAlert(message) {
    Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: message,
    });
}

// Verificar se há mensagens na URL
const urlParams = new URLSearchParams(window.location.search);
const successMessage = urlParams.get('success');
const errorMessage = urlParams.get('error');

if (successMessage) {
    showSuccessAlert(successMessage);
}

if (errorMessage) {
    showErrorAlert(errorMessage);
}
