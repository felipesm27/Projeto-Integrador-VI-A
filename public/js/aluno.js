// Função para excluir um aluno
async function excluirAluno(id, nome) {
    Swal.fire({
        title: `Tem certeza que deseja excluir o aluno ${nome}?`,
        text: "Essa ação não poderá ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/alunos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire(
                        'Excluído!',
                        `O aluno ${nome} foi excluído com sucesso.`,
                        'success'
                    );
                    location.reload(); // Recarrega a página após exclusão
                } else {
                    Swal.fire(
                        'Erro!',
                        'Não foi possível excluir o aluno.',
                        'error'
                    );
                }
            })
            .catch(error => {
                console.error('Erro ao excluir o aluno:', error);
                Swal.fire(
                    'Erro!',
                    'Ocorreu um erro ao tentar excluir o aluno.',
                    'error'
                );
            });
        }
    });
}

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
