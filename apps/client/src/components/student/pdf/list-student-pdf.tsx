import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer'
import type { ColumnDef } from '@tanstack/react-table'
import type { Student } from '@/types/student'

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    alignItems: 'center',
    minHeight: 30,
  },
  headerCell: {
    backgroundColor: '#f1f5f9',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  cell: {
    padding: 5,
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  photoCell: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  noData: {
    padding: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
})

// Columnas adaptadas para PDF
const pdfColumns: ColumnDef<Student>[] = [
  {
    accessorKey: 'possition',
    header: 'Posición',
  },
  {
    accessorKey: 'photo',
    header: 'Foto',
    cell: ({ getValue }) => {
      const photo = getValue() as string | null | undefined
      return photo ? (
        <Image src={photo} style={styles.photo} />
      ) : (
        <Text style={{ fontSize: 8 }}>Sin foto</Text>
      )
    },
  },
  {
    accessorKey: 'names',
    header: 'Nombres',
  },
  {
    accessorKey: 'lastnames',
    header: 'Apellidos',
  },
  {
    accessorKey: 'ci',
    header: 'CI',
  },
]

// Componente PDF
export function ListStudentPDF({ data }: { data: Student[] }) {
  return (
    <Document
      author='Sistema Estudiantil'
      pdfVersion='1.7'
      creator='React PDF'
      title='Lista de estudiantes'
    >
      <Page size='A4' style={styles.page} orientation='landscape'>
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Estudiantes</Text>
          <Text style={{ fontSize: 12 }}>
            {new Date().toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.table}>
          {/* Encabezados */}
          <View style={[styles.row, { borderBottomWidth: 2 }]}>
            {pdfColumns.map((column, index) => (
              <View key={index} style={styles.headerCell}>
                <Text>{String(column.header)}</Text>
              </View>
            ))}
          </View>
          Filas de datos
          {data.length > 0 ? (
            data.map((student, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {pdfColumns.map((column, colIndex) => {
                  const cellValue = column.accessorKey
                    ? student[column.accessorKey as keyof Student]
                    : column.cell?.({ getValue: () => student }) || ''

                  return (
                    <View
                      key={colIndex}
                      style={[
                        styles.cell,
                        column.accessorKey === 'photo' ? styles.photoCell : {},
                      ]}
                    >
                      {typeof cellValue === 'string' ||
                      typeof cellValue === 'number' ? (
                        <Text>{cellValue}</Text>
                      ) : (
                        cellValue
                      )}
                    </View>
                  )
                })}
              </View>
            ))
          ) : (
            <View style={styles.row}>
              <View style={[styles.cell, { flex: pdfColumns.length }]}>
                <Text style={styles.noData}>No hay datos</Text>
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  )
}
