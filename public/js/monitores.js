async function excluirMonitor(id, nome) {
    Swal.fire({
        title: `Tem certeza que deseja excluir o monitor ${nome}?`,
        text: "Essa ação não poderá ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/monitores/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json(); // Se o servidor enviar um JSON de confirmação
                    Swal.fire(
                        'Excluído!',
                        `O monitor ${nome} foi excluído com sucesso.`,
                        'success'
                    ).then(() => {
                        location.reload(); // Recarrega a página após exclusão
                    });
                } else {
                    const errorData = await response.json();
                    Swal.fire(
                        'Erro!',
                        errorData.message || 'Não foi possível excluir o monitor.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error('Erro ao excluir o monitor:', error);
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao tentar excluir o monitor.',
                    'error'
                );
            });
        }
    });
}


// Script para mensagens de sucesso e erro
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
