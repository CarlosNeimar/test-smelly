
const { UserService } = require('../src/userService');

const dadosUsuarioPadrao = {
  nome: 'Fulano de Tal',
  email: 'fulano@teste.com',
  idade: 25,
};

describe('UserService - Suíte de Testes Limpa (Clean)', () => {
  let userService;



  beforeEach(() => {
    userService = new UserService();
    userService._clearDB();
  });






  test('deve criar um novo usuário com sucesso', () => {



    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );


    expect(usuarioCriado.id).toBeDefined();
    expect(usuarioCriado.nome).toBe(dadosUsuarioPadrao.nome);
    expect(usuarioCriado.email).toBe(dadosUsuarioPadrao.email);
    expect(usuarioCriado.idade).toBe(dadosUsuarioPadrao.idade);
    expect(usuarioCriado.status).toBe('ativo');
  });

  test('deve buscar um usuário existente pelo ID', () => {

    const usuarioCriado = userService.createUser(
      dadosUsuarioPadrao.nome,
      dadosUsuarioPadrao.email,
      dadosUsuarioPadrao.idade
    );


    const usuarioBuscado = userService.getUserById(usuarioCriado.id);


    expect(usuarioBuscado).toBeDefined();
    expect(usuarioBuscado.id).toBe(usuarioCriado.id);
    expect(usuarioBuscado.nome).toBe(usuarioCriado.nome);
  });






  test('deve desativar um usuário comum com sucesso', () => {

    const usuarioComum = userService.createUser('Comum', 'comum@teste.com', 30, false);


    const resultado = userService.deactivateUser(usuarioComum.id);


    expect(resultado).toBe(true);
    const usuarioAtualizado = userService.getUserById(usuarioComum.id);
    expect(usuarioAtualizado.status).toBe('inativo');
  });

  test('não deve desativar um usuário administrador', () => {

    const usuarioAdmin = userService.createUser('Admin', 'admin@teste.com', 40, true);


    const resultado = userService.deactivateUser(usuarioAdmin.id);


    expect(resultado).toBe(false);
    const usuarioAtualizado = userService.getUserById(usuarioAdmin.id);
    expect(usuarioAtualizado.status).toBe('ativo');
  });






  test('deve gerar um relatório contendo os dados dos usuários', () => {
   
    userService.createUser('Alice', 'alice@email.com', 28);
    userService.createUser('Bob', 'bob@email.com', 32);

   
    const relatorio = userService.generateUserReport();

   
   
   
    expect(relatorio).toContain('--- Relatório de Usuários ---');
    expect(relatorio).toContain('Alice');
    expect(relatorio).toContain('Bob');  
    
   
   
    expect(relatorio).toContain('Status: ativo');
  });






  test('deve lançar uma exceção ao tentar criar usuário menor de idade', () => {


    const acao = () => {
      userService.createUser('Menor', 'menor@email.com', 17);
    };



    expect(acao).toThrow('O usuário deve ser maior de idade.');
  });






  test('deve gerar um relatório vazio quando não há usuários', () => {



    const relatorio = userService.generateUserReport();



    expect(relatorio).toContain('--- Relatório de Usuários ---');
    expect(relatorio).not.toContain('ID:');
  });
});