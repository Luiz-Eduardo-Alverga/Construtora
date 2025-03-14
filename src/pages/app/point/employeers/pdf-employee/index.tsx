import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

import { getEmployeePointsPdf } from '@/api/employee-points/get-employee-data-pdf'
import { getEmployeePoints } from '@/api/employee-points/get-employee-points'

interface EmployeePointsData {
  data: {
    Data: string
    HoraInicio: string | null
    HoraAlmoco: string | null
    HoraRetorno: string | null
    HoraFim: string | null
    horasTrabalhadas: string
    tempoAlmoco: string
  }[]
}

interface EnterpriseData {
  razao: string
  fantasia: string
  cep: string
  cnpj: string
  cidade: string
  endereco: string
  numero: string
  bairro: string
  uf: string
}

interface EmployeeData {
  nome: string
  funcao: string
  cpf: string
}

const styles = StyleSheet.create({
  // Estilo geral da página
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  // Estilo da tabela
  table: {
    display: 'flex',
    borderWidth: 1,
    width: 'auto',
    borderColor: '#d1d5db',
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 1,
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
  },
  tableColHeader: {
    width: '20%',
  },
  tableCol: {
    width: '20%',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 8,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 7,
  },
  tableRowEven: {
    flexDirection: 'row',
    padding: 1,
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6', // Cor para linhas pares
  },
  tableRowOdd: {
    flexDirection: 'row',
    padding: 1,
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff', // Cor para linhas ímpares
  },
  // Estilo do cabeçalho da primeira página
  companyHeader: {
    display: 'flex',
    gap: 2,
    marginBottom: 20,
    border: 1,
    borderColor: '#d1d5db',
    padding: 10,
  },
  companyHeaderTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyHeaderSubtitle: {
    fontSize: 8,
  },
  companyHeaderSubtitleEmployee: {
    fontSize: 10,
    marginTop: 4,
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  totalizer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    border: 1,
    width: '40%',
    gap: 8,
    backgroundColor: '#f3f4f6',
    borderColor: '#d1d5db',
  },
  totalizerTitle: {
    fontSize: 12,
    paddingBottom: 4,
    borderBottom: 1,
    borderColor: '#d1d5db',
    width: '100%',
  },
  totalizerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 5,
  },
  // Estilo do rodapé
  footer: {
    width: '100%',
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  footerAssignature: {
    fontSize: 8,
    marginTop: 5,
    alignItems: 'flex-start', // Alinha tudo no lado esquerdo
    justifyContent: 'flex-start',
    width: '70%', // Define largura específica para controlar o alinhamento
  },
  footerLine: {
    fontSize: 8,
    marginTop: 15,
    marginBottom: 2,
    textAlign: 'center', // Centraliza o texto relativo à linha
    width: '100%',
    borderBottomWidth: 1, // Adiciona uma linha abaixo para assinatura
    borderBottomColor: '#000',
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center', // Centraliza o texto relativo à linha
    marginTop: 2,
  },
})

const MyDocument = ({
  data,
  enterprise,
  employee,
  dateFrom,
  dateTo,
  BancoHoras,
  HorasTrabalhadas,
}: {
  data: EmployeePointsData['data']
  enterprise: EnterpriseData
  employee: EmployeeData
  dateFrom: string
  dateTo: string
  BancoHoras: string
  HorasTrabalhadas: string
}) => {
  const formatDate = (date: string): string => {
    if (!date) return 'N/A'
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }

  const HEADER_HEIGHT = 40 // Altura do cabeçalho da tabela
  const ROW_HEIGHT = 20 // Altura de cada linha da tabela

  // Função para calcular a altura máxima por página
  const calculatePageHeight = (pageIndex: number) =>
    pageIndex === 0 ? 600 : 700

  // Dividir os dados em blocos para cada página
  const pages = []
  let remainingData = [...data]
  let pageIndex = 0

  while (remainingData.length > 0) {
    const currentPageHeight = calculatePageHeight(pageIndex)
    const maxRowsPerPage = Math.floor(
      (currentPageHeight - HEADER_HEIGHT) / ROW_HEIGHT,
    )
    pages.push(remainingData.slice(0, maxRowsPerPage))
    remainingData = remainingData.slice(maxRowsPerPage)
    pageIndex++
  }

  return (
    <Document>
      {pages.map((pageData, pageIndex) => (
        <Page size="A4" style={styles.page} key={pageIndex}>
          {pageIndex === 0 && (
            <View style={styles.companyHeader}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text style={styles.companyHeaderTitle}>
                  {enterprise?.razao || 'Razão Social Não Informada'}
                </Text>
                <Text style={styles.companyHeaderSubtitle}>
                  {`Período: ${formatDate(dateFrom)} à ${formatDate(dateTo)}`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 12,
                }}
              >
                <Text style={styles.companyHeaderSubtitle}>
                  {enterprise?.fantasia || 'Nome Fantasia Não Informado'}
                </Text>
                <Text style={styles.companyHeaderSubtitle}>
                  {`CNPJ: ${enterprise?.cnpj || 'N/A'}`}
                </Text>
              </View>

              <Text style={styles.companyHeaderSubtitle}>
                Endereço: {enterprise?.endereco}, {enterprise?.numero},{' '}
                {enterprise?.bairro}, {enterprise?.cidade} - {enterprise?.uf} -
                CEP: {enterprise?.cep}
              </Text>

              <Text style={styles.companyHeaderSubtitleEmployee}>
                Funcionário: {employee?.nome} | Função: {employee?.funcao} |
                CPF: {employee?.cpf}
              </Text>
            </View>
          )}

          {/* Restante do conteúdo */}
          <View style={styles.table}>
            {/* Cabeçalho da Tabela */}
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Data</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Hora Início</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Hora Almoço</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Hora Retorno</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Hora Fim</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Horas Trabalhadas</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>Tempo de Almoço</Text>
              </View>
            </View>

            {pageData.map((item, index) => (
              <View
                style={
                  index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd
                }
                key={index}
              >
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.Data}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.HoraInicio || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.HoraAlmoco || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.HoraRetorno || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{item.HoraFim || 'N/A'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.horasTrabalhadas || 'N/A'}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {item.tempoAlmoco || 'N/A'}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {pageIndex === pages.length - 1 && (
            <View style={styles.footerContent}>
              <View style={styles.totalizer}>
                <Text style={styles.totalizerTitle}>Total de Horas</Text>
                <View style={styles.totalizerRow}>
                  <Text style={styles.footerText}>Horas Trabalhadas:</Text>
                  <Text style={styles.footerText}>{HorasTrabalhadas}</Text>
                </View>

                <View style={styles.totalizerRow}>
                  <Text style={styles.footerText}>Banco de horas:</Text>
                  <Text style={styles.footerText}>{BancoHoras}</Text>
                </View>
              </View>

              <View style={styles.footer}>
                <View style={styles.footerAssignature}>
                  <View style={{ width: '80%' }}>
                    <Text style={styles.footerLine}></Text>
                    <Text style={styles.footerText}>Assinatura</Text>
                  </View>

                  <View style={{ width: '80%', marginTop: 10 }}>
                    <Text style={styles.footerLine}></Text>
                    <Text style={styles.footerText}>Assinatura Gestor</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </Page>
      ))}
    </Document>
  )
}

export function EmploeePDF() {
  const { id, dateTo, dateFrom } = useParams()

  const parsedEmployeeId = id ? parseInt(id, 10) : undefined

  const { data } = useQuery({
    queryKey: ['pdfPointsData'],
    queryFn: () => getEmployeePointsPdf({ id: parsedEmployeeId }),
  })

  const enterpriseData = data?.empresa.data
  const employeeData = data?.funcionario.data

  const { data: results } = useQuery({
    queryKey: ['employeePoints', parsedEmployeeId, dateFrom, dateTo],
    queryFn: () =>
      getEmployeePoints({
        EmployeeId: parsedEmployeeId,
        DataInicio: dateFrom,
        DataFim: dateTo,
      }),
  })

  return (
    <div>
      <Helmet title="Cartao de ponto" />
      {results && enterpriseData && employeeData && (
        <PDFViewer width="100%" height="952">
          <MyDocument
            BancoHoras={results.BancoHoras}
            HorasTrabalhadas={results.HorasTrabalhadas}
            data={results.data}
            enterprise={enterpriseData}
            employee={employeeData}
            dateFrom={dateFrom || 'N/A'}
            dateTo={dateTo || 'N/A'}
          />
        </PDFViewer>
      )}
    </div>
  )
}
