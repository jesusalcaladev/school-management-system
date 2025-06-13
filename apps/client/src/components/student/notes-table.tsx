import { useState, useMemo, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Calculator, TrendingUp, GraduationCap, RefreshCw } from 'lucide-react'
import { getNotes, updateSubjectGrades } from '@/services/note'
import { FadeLoader } from 'react-spinners'
import type { Student, Notes, Periods } from '@/types/student'

// Interfaces
interface PeriodData {
  lenguageAndLiterature: number
  languages: number
  mathematics: number
  educationPhysics: number
  biology: number
  physics: number
  chemistry: number
  geography: number
  stableGroup: number
}

// Mapeo de materias
const subjectMapping = {
  Castellano: 'lenguageAndLiterature',
  Inglés: 'languages',
  Matemáticas: 'mathematics',
  'Educación Física': 'educationPhysics',
  Biología: 'biology',
  Física: 'physics',
  Química: 'chemistry',
  Geografía: 'geography',
  'Grupo Estable': 'stableGroup',
}

const years = ['1er Año', '2do Año', '3er Año', '4to Año', '5to Año']
const yearMapping = {
  '1er Año': 'year1',
  '2do Año': 'year2',
  '3er Año': 'year3',
  '4to Año': 'year4',
  '5to Año': 'year5',
}

export function NotesTable({
  idStudent,
  student,
}: {
  idStudent: string
  student: Student
}) {
  const [selectedYear, setSelectedYear] = useState<string>('1er Año')
  const [isUpdating, setIsUpdating] = useState(false)
  const [localAcademicRecord, setLocalAcademicRecord] = useState<Notes | null>(
    null
  )
  const [editableGrades, setEditableGrades] = useState<Record<string, number>>(
    {}
  )

  const { data: academicRecord, refetch } = useQuery({
    queryKey: ['notes', idStudent],
    queryFn: () => getNotes(idStudent),
  })

  const { mutate } = useMutation({
    mutationKey: ['update-subject-grades', idStudent],
    mutationFn: updateSubjectGrades,
  })

  useEffect(() => {
    if (academicRecord) {
      setLocalAcademicRecord(academicRecord)
      // Inicializar el estado editable con las notas actuales
      const initialEditable: Record<string, number> = {}
      Object.entries(academicRecord).forEach(([yearKey, yearData]) => {
        if (typeof yearData === 'object' && yearData !== null) {
          Object.entries(yearData).forEach(([period, periodData]) => {
            if (typeof periodData === 'object' && periodData !== null) {
              Object.entries(periodData).forEach(([subject, grade]) => {
                const uniqueKey = `${yearKey}.${period}.${subject}`
                initialEditable[uniqueKey] = grade
              })
            }
          })
        }
      })
      setEditableGrades(initialEditable)
    }
  }, [academicRecord])

  // Obtener datos del año seleccionado
  const selectedYearData = useMemo(() => {
    if (!localAcademicRecord) return null
    const yearKey = yearMapping[selectedYear as keyof typeof yearMapping]
    return localAcademicRecord[yearKey as keyof Notes]
  }, [localAcademicRecord, selectedYear])

  // Función para manejar cambios en las notas editables
  const handleGradeChange = (
    yearKey: string,
    period: string,
    subject: keyof PeriodData,
    value: number
  ) => {
    const uniqueKey = `${yearKey}.${period}.${subject}`
    setEditableGrades((prev) => ({
      ...prev,
      [uniqueKey]: value,
    }))

    // Actualizar el registro local
    if (localAcademicRecord) {
      const updatedRecord = { ...localAcademicRecord }
      if (
        updatedRecord[yearKey as keyof Notes] &&
        updatedRecord[yearKey as keyof Notes][period as keyof Periods]
      ) {
        updatedRecord[yearKey as keyof Notes][period as keyof Periods]![
          subject
        ] = value
        setLocalAcademicRecord(updatedRecord)
      }
    }
  }

  // Función para actualizar un periodo específico
  const updatePeriod = async (period: keyof Periods) => {
    if (!student || !localAcademicRecord || !selectedYearData) return

    setIsUpdating(true)
    try {
      const yearKey = yearMapping[selectedYear as keyof typeof yearMapping]
      const updateData = selectedYearData[period]

      const body = {
        id: localAcademicRecord._id,
        year: yearKey,
        period: period,
        updateData: updateData,
      }

      mutate(body, {
        onSuccess: () => {
          refetch() // Vuelve a obtener los datos para asegurar que estamos sincronizados
        },
        onError: (error) => {
          console.error('Error updating period:', error)
        },
        onSettled: () => {
          setIsUpdating(false)
        },
      })
    } catch (error) {
      console.error('Error actualizando periodo:', error)
      setIsUpdating(false)
    }
  }

  // Calcular promedios para visualización
  const periodAverages = useMemo(() => {
    if (!selectedYearData) return null

    const calculateAverage = (period: keyof Periods) => {
      const periodData = selectedYearData[period]
      const values = Object.values(periodData)
      return values.reduce((sum, val) => sum + val, 0) / values.length
    }

    return {
      period1: calculateAverage('period1'),
      period2: calculateAverage('period2'),
      period3: calculateAverage('period3'),
    }
  }, [selectedYearData])

  // Calcular la nota final de cada materia (promedio de los tres períodos)
  const calculateFinalGrade = (subject: keyof PeriodData) => {
    if (!selectedYearData) return 0

    const p1 = selectedYearData.period1[subject] || 0
    const p2 = selectedYearData.period2[subject] || 0
    const p3 = selectedYearData.period3[subject] || 0

    return (p1 + p2 + p3) / 3
  }

  // Función para obtener color según calificación
  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-green-700 bg-green-50'
    if (grade >= 12) return 'text-blue-700 bg-blue-50'
    if (grade >= 10) return 'text-yellow-700 bg-yellow-50'
    return 'text-red-700 bg-red-50'
  }

  if (!student || !academicRecord) {
    return <FadeLoader className='mx-auto' color='var(--color-blue-500)' />
  }

  return (
    <div className='min-h-screen py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Year Filter */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
          <div className='px-6 py-4 border-b border-gray-200'>
            <h2 className='text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4'>
              <GraduationCap className='w-5 h-5' />
              Seleccionar Año Académico
            </h2>
            <div className='flex flex-wrap gap-2'>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Academic Record Display */}
        {selectedYearData && (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-8'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                <Calculator className='w-5 h-5' />
                Calificaciones - {selectedYear}
              </h2>
              <p className='text-sm text-gray-600 mt-1'>
                ID Registro: {academicRecord._id}
              </p>
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-gray-50'>
                    <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                      Materia
                    </th>
                    <th className='px-4 py-4 text-center text-sm font-semibold text-gray-900'>
                      1er Lapso
                      <button
                        onClick={() => updatePeriod('period1')}
                        disabled={isUpdating}
                        className='ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded flex items-center gap-1 mx-auto mt-1'
                      >
                        <RefreshCw size={12} />
                        Actualizar
                      </button>
                    </th>
                    <th className='px-4 py-4 text-center text-sm font-semibold text-gray-900'>
                      2do Lapso
                      <button
                        onClick={() => updatePeriod('period2')}
                        disabled={isUpdating}
                        className='ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded flex items-center gap-1 mx-auto mt-1'
                      >
                        <RefreshCw size={12} />
                        Actualizar
                      </button>
                    </th>
                    <th className='px-4 py-4 text-center text-sm font-semibold text-gray-900'>
                      3er Lapso
                      <button
                        onClick={() => updatePeriod('period3')}
                        disabled={isUpdating}
                        className='ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded flex items-center gap-1 mx-auto mt-1'
                      >
                        <RefreshCw size={12} />
                        Actualizar
                      </button>
                    </th>
                    <th className='px-4 py-4 text-center text-sm font-semibold text-gray-900'>
                      Nota Final
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200'>
                  {Object.entries(subjectMapping).map(
                    ([spanishSubject, englishSubject]) => {
                      const subjectKey = englishSubject as keyof PeriodData
                      const yearKey =
                        yearMapping[selectedYear as keyof typeof yearMapping]

                      return (
                        <tr key={englishSubject} className='hover:bg-gray-50'>
                          <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                            {spanishSubject}
                          </td>

                          <td className='px-4 py-4 text-center'>
                            <input
                              type='number'
                              min='0'
                              max='20'
                              step='0.1'
                              value={
                                editableGrades[
                                  `${yearKey}.period1.${subjectKey}`
                                ] ||
                                selectedYearData.period1[subjectKey] ||
                                0
                              }
                              onChange={(e) =>
                                handleGradeChange(
                                  yearKey,
                                  'period1',
                                  subjectKey,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className='w-16 px-2 py-1 text-center border border-gray-300 rounded'
                            />
                          </td>

                          {/* Período 2 */}
                          <td className='px-4 py-4 text-center'>
                            <input
                              type='number'
                              min='0'
                              max='20'
                              step='0.1'
                              value={
                                editableGrades[
                                  `${yearKey}.period2.${subjectKey}`
                                ] ||
                                selectedYearData.period2[subjectKey] ||
                                0
                              }
                              onChange={(e) =>
                                handleGradeChange(
                                  yearKey,
                                  'period2',
                                  subjectKey,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className='w-16 px-2 py-1 text-center border border-gray-300 rounded'
                            />
                          </td>

                          {/* Período 3 */}
                          <td className='px-4 py-4 text-center'>
                            <input
                              type='number'
                              min='0'
                              max='20'
                              step='0.1'
                              value={
                                editableGrades[
                                  `${yearKey}.period3.${subjectKey}`
                                ] ||
                                selectedYearData.period3[subjectKey] ||
                                0
                              }
                              onChange={(e) =>
                                handleGradeChange(
                                  yearKey,
                                  'period3',
                                  subjectKey,
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className='w-16 px-2 py-1 text-center border border-gray-300 rounded'
                            />
                          </td>

                          {/* Nota Final */}
                          <td className='px-4 py-4 text-center'>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(
                                calculateFinalGrade(subjectKey)
                              )}`}
                            >
                              {calculateFinalGrade(subjectKey).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Averages Section */}
        {periodAverages && (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                <TrendingUp className='w-5 h-5' />
                Promedios por Período
              </h2>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <h3 className='text-sm font-medium text-gray-600 mb-2'>
                    1er Lapso
                  </h3>
                  <div
                    className={`text-2xl font-bold ${getGradeColor(
                      periodAverages.period1
                    )}`}
                  >
                    {periodAverages.period1.toFixed(2)}
                  </div>
                </div>

                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <h3 className='text-sm font-medium text-gray-600 mb-2'>
                    2do Lapso
                  </h3>
                  <div
                    className={`text-2xl font-bold ${getGradeColor(
                      periodAverages.period2
                    )}`}
                  >
                    {periodAverages.period2.toFixed(2)}
                  </div>
                </div>

                <div className='text-center p-4 bg-gray-50 rounded-lg'>
                  <h3 className='text-sm font-medium text-gray-600 mb-2'>
                    3er Lapso
                  </h3>
                  <div
                    className={`text-2xl font-bold ${getGradeColor(
                      periodAverages.period3
                    )}`}
                  >
                    {periodAverages.period3.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className='mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6'>
          <h3 className='font-semibold text-blue-900 mb-3'>
            Instrucciones del Sistema
          </h3>
          <div className='text-blue-800 text-sm space-y-2'>
            <p>• Selecciona el año académico para ver las calificaciones</p>
            <p>• Edita las notas directamente en los campos de entrada</p>
            <p>
              • Usa el botón "Actualizar" debajo de cada período para guardar
              cambios específicos
            </p>
            <p>
              • La nota final se calcula automáticamente como el promedio de los
              tres períodos
            </p>
            <p>
              • Los colores indican el rendimiento: Verde (≥16), Azul (≥12),
              Amarillo (≥10), Rojo (&lt;10)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
