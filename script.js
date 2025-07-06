async function gerarSenha() {
    try {
        const senha = document.querySelector("#SENHA").value;
        const salt = document.querySelector("#SALT").value;

        if (!senha || !salt) {
            alert("Preencha os campos corretamente!");
            return;
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(senha + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);

        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        
        // Copia senha para o buffer do copia e cola
        await navigator.clipboard.writeText(hashHex);
        alert("Senha copiada com sucesso!");
    } catch (error) {
        console.error("ERRO: ", error);
    }
}