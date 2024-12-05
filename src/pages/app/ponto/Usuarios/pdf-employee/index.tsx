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

import { getEmployee } from '@/api/get-employee'
import { getEnterprise } from '@/api/get-enterprise'
import { getEmployeePoints } from '@/api/getUserPoints'

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
  id: 'number'
  razaoSocial: 'string'
  nomeFantasia: 'string'
  cep: 'string'
  cnpj: 'string'
  inscricaoEstadual: 'null | string'
  telefone1: 'string'
  telefone2: 'string'
  cidade: 'string'
  endereco: 'string'
  uf: 'string'
  numero: 'number'
  bairro: 'string'
  email: 'null | string'
  desativada: 'number'
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

  // Estilo do rodapé
  footer: {
    marginTop: 20,
    paddingTop: 10,
  },
  footerAssignature: {
    fontSize: 8,
    marginTop: 5,
    alignItems: 'flex-start', // Alinha tudo no lado esquerdo
    justifyContent: 'flex-start',
    width: '50%', // Define largura específica para controlar o alinhamento
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
}: {
  data: EmployeePointsData['data']
  enterprise: EnterpriseData
}) => {
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
          {/* Cabeçalho personalizado na primeira página */}
          {pageIndex === 0 && (
            <View style={styles.companyHeader}>
              <Text style={styles.companyHeaderTitle}>
                {enterprise?.razaoSocial || 'Razão Social Não Informada'}
              </Text>
              <Text style={styles.companyHeaderSubtitle}>
                {enterprise?.nomeFantasia || 'Nome Fantasia Não Informado'}
              </Text>
              <Text style={styles.companyHeaderSubtitle}>
                Endereço: {enterprise?.endereco}, {enterprise?.numero},{' '}
                {enterprise?.bairro}, {enterprise?.cidade} - {enterprise?.uf}
              </Text>
              <Text style={styles.companyHeaderSubtitle}>
                CEP: {enterprise?.cep} | CNPJ: {enterprise?.cnpj}
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

            {/* Linhas da Tabela */}
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
          )}
        </Page>
      ))}
    </Document>
  )
}

export function EmploeePDF() {
  const { id, dateTo, dateFrom } = useParams()

  const parsedEmployeeId = id ? parseInt(id, 10) : undefined

  const { data: enterpriseData } = useQuery({
    queryKey: ['getEnterprise'],
    queryFn: getEnterprise,
  })

  const { data: employee } = useQuery({
    queryKey: ['EmployeeDetails', id],
    queryFn: () => getEmployee({ id }),
  })

  console.log(employee)

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
      {results && enterpriseData && (
        <PDFViewer width="100%" height="952">
          <MyDocument data={results.data} enterprise={enterpriseData} />
        </PDFViewer>
      )}
    </div>
  )
}
