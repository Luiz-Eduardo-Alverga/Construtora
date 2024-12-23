import { EditEmployeeSchema } from "../../register-employee-form"

interface Employee {
    id: string | null
    nome: string | null
    codigo: string | null
    dataAdmissao: string | null
    dataDemissao: string | null
    endereco: string | null
    cep: string | null
    bairro: string | null
    numeroEndereco: string | null
    cidade: string | null
    uf: string | null
    emissaoRG: string | null
    complemento: string | null
    cpf: string | null
    esocial: string | null
    rg: string | null
    orgaoEmissor: string | null
    ufRg: string | null
    dataEmissaoRg: string | null
    pisPasep: string | null
    ctps: string | null
    serieCtps: string | null
    nomePai: string | null
    nomeMae: string | null
    ufNasc: string | null
    nascimentoMunicipio: string | null
    funcao: number | null
    dataNascimento: string | null
  }

export const fieldsMapping: {
    formField: keyof EditEmployeeSchema;
    employeeField: keyof Employee;
  }[] = [
    { formField: 'cep', employeeField: 'cep' },
    { formField: 'nome', employeeField: 'nome' },
    { formField: 'codigoPonto', employeeField: 'codigo' },
    { formField: 'endereco', employeeField: 'endereco' },
    { formField: 'bairro', employeeField: 'bairro' },
    { formField: 'cidade', employeeField: 'cidade' },
    { formField: 'complemento', employeeField: 'complemento' },
    { formField: 'numeroEndereco', employeeField: 'numeroEndereco' },
    { formField: 'uf', employeeField: 'uf' },
    { formField: 'cidadeNascimento', employeeField: 'nascimentoMunicipio' },
    { formField: 'ufNascimento', employeeField: 'ufNasc' },
    { formField: 'nomePai', employeeField: 'nomePai' },
    { formField: 'nomeMae', employeeField: 'nomeMae' },
    { formField: 'rg', employeeField: 'rg' },
    { formField: 'serie', employeeField: 'serieCtps' },
    { formField: 'esocial', employeeField: 'esocial' },
    { formField: 'orgaoEmissor', employeeField: 'orgaoEmissor' },
    { formField: 'ufRg', employeeField: 'ufRg' },
    { formField: 'ctps', employeeField: 'ctps' },
    { formField: 'cpf', employeeField: 'cpf' },
    { formField: 'pis', employeeField: 'pisPasep' },
  ];