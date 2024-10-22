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
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
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
    borderBottomWidth: 1, // Borda padrão
  },
  lastTableRow: {
    borderBottomWidth: 0, // Remova a borda inferior para a última linha
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
})

const MyDocument = ({ data }: EmployeePointsData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Tabela com os dados */}
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
            <Text style={styles.tableCellHeader}>Assinatura</Text>
          </View>
        </View>

        {/* Linhas da Tabela com os Dados */}
        {data.map((item, index) => {
          const isLastRow = index === data.length - 1 // Verifica se é a última linha
          const rowStyle = isLastRow
            ? [styles.tableRow, styles.lastTableRow] // Estilo sem borda inferior
            : styles.tableRow // Estilo com borda normal

          return (
            <View style={rowStyle} key={index}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.Data}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.HoraInicio || 'N/A'}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.HoraAlmoco || 'N/A'}</Text>
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
                <Text style={styles.tableCell}>_________</Text>
              </View>
            </View>
          )
        })}
      </View>
    </Page>
  </Document>
)

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
