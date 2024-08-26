import fs from 'fs';
import path from 'path';
import trataErros from './funcoesErros.js';
import { contaPalavras } from './index.js';
import { montaSaidaArquivo } from './helpers.js';
import { Command } from 'commander';
import chalk from 'chalk';

const program = new Command();

program
  .version('0.0.1')
  .option('-t, --texto <string>', 'caminho do texto a ser processado')
  .option('-d, --destino <string>', 'caminho da pasta onde salvar o arquivo')
  .action((options) => {
    const { texto, destino } = options;
    if (!texto || !destino) {
      console.error(
        chalk.red('Erro: favor inserir caminho de origem e destino')
      );
      return;
    }
    const caminhoTexto = path.resolve(texto);
    const caminhoDestino = path.resolve(destino);
    try {
      processaArquivo(caminhoTexto, caminhoDestino);
      console.log(chalk.green('Texto processado com sucesso'));
    } catch (erro) {
      console.log('Ocorreu um erro no processamento', erro);
    }
  });

program.parse();

function processaArquivo(texto, destino) {
  fs.readFile(texto, 'utf-8', (erro, texto) => {
    try {
      if (erro) throw erro;
      const resultado = contaPalavras(texto);
      crieEsalvaArquivo(resultado, destino);
    } catch (erro) {
      trataErros(erro);
    }
  });
}

async function crieEsalvaArquivo(listaPalavras, endereco) {
  const arquivoNovo = `${endereco}/resultado.txt`;
  const textoPalavras = montaSaidaArquivo(listaPalavras);
  try {
    await fs.promises.writeFile(arquivoNovo, textoPalavras);
    console.log('Arquivo Criado');
  } catch (erro) {}
}
