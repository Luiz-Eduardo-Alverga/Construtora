import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { useQuery } from '@tanstack/react-query'
import { X } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { getEmployeePoints } from '@/api/getUserPoints'
import { Button } from '@/components/ui/button'

interface EmployeePointsData {
  data: {
    Data: string
    HoraInicio: string | null
    HoraAlmoco: string | null
    HoraRetorno: string | null
    HoraFim: string | null
  }[]
}

const styles = StyleSheet.create({
  // Estilo geral da página
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  // Estilo da tabela
  table: {
    display: 'flex',
    borderWidth: 1,
    width: 'auto',
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 3,
    borderBottomWidth: 1,
  },
  tableColHeader: {
    width: '20%',
  },
  tableCol: {
    width: '20%',
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  // Estilo do cabeçalho da primeira página
  companyHeader: {
    marginBottom: 20,
  },
  companyHeaderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  companyHeaderSubtitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  companyHeaderSeparator: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
  // Estilo do rodapé
  footer: {
    marginTop: 20,
    paddingTop: 10,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
  },
})

const MyDocument = ({ data }: EmployeePointsData) => {
  const HEADER_HEIGHT = 40 // Altura do cabeçalho da tabela
  const ROW_HEIGHT = 20 // Altura de cada linha da tabela

  // Função para calcular a altura máxima por página
  const calculatePageHeight = (pageIndex: number) =>
    pageIndex === 0 ? 500 : 580

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
              <Text style={styles.companyHeaderTitle}>Empresa XYZ Ltda</Text>
              <Text style={styles.companyHeaderSubtitle}>
                Funcionário: João Silva
              </Text>
              <Text style={styles.companyHeaderSubtitle}>
                Período: 01/01/2023 a 31/12/2023
              </Text>
              <Text style={styles.companyHeaderSeparator}>
                ----------------------------------------
              </Text>
            </View>
          )}

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
            </View>

            {/* Linhas da Tabela */}
            {pageData.map((item, index) => (
              <View style={styles.tableRow} key={index}>
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
              </View>
            ))}
          </View>

          {/* Rodapé diretamente abaixo do último conteúdo na última página */}
          {pageIndex === pages.length - 1 && (
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Este é o rodapé da última página.
              </Text>
              <Text style={styles.footerText}>Assinatura: _______________</Text>
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
      <div className="flex m-0.5  items-center ml-2">
        <h1 className="font-semibold">Relatorio Listagem de pontos</h1>
        <div className="ml-auto">
          <Link to={'/ponto/usuarios'}>
            <Button variant={'outline'} size={'sm'}>
              <X /> Fechar
            </Button>
          </Link>
        </div>
      </div>
      {results && (
        <PDFViewer width="100%" height="900">
          <MyDocument data={results.data} />
        </PDFViewer>
      )}
    </div>
  )
}
