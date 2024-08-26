export function contaPalavras(texto) {
  const paragrafos = extraiParagrafos(texto);
  const contagem = paragrafos.flatMap((paragrafo) => {
    if (!paragrafo) return [];
    return verificaPalavrasDuplicadas(paragrafo);
  });
  return contagem;
}

function extraiParagrafos(texto) {
  return texto.toLowerCase().split('\n');
}

function verificaPalavrasDuplicadas(texto) {
  const palavra = texto.split(' ');
  const resultado = {};
  palavra.forEach((palavra) => {
    const palavraLimpa = limpaPalavras(palavra);
    if (palavraLimpa.length >= 3) {
      resultado[palavraLimpa] = (resultado[palavraLimpa] || 0) + 1;
    }
  });
  return resultado;
}

function limpaPalavras(palavra) {
  return palavra.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
}
