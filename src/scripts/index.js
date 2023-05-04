export const baseUrl = 'https://api.github.com/users'

export const getAllUsersAPI = async () => {
    const allUsers = await fetch(`${baseUrl}`, {
        method: 'GET'
    })
    .then((response) => {
        if (response.ok){
            return response.json()
        } else {
            alert(`O limite de taxa de uso da API foi excedido ou a API está fora do ar. Volte mais tarde!`)
            throw new Error('URL inválida');
        }
    })
    return allUsers
}

export const allUsers = await getAllUsersAPI();