import { NoteModel } from '../models/note.js'

export const createNote = async (req, res) => {
  const { idStudent } = req.body
  const notes = new NoteModel({ idStudent })
  try {
    const note = await notes.save()
    res.status(201).json(note)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getNotes = async (req, res) => {
  const { idStudent } = req.params
  try {
    const notes = await NoteModel.findOne({ idStudent })
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notes' })
  }
}

export async function updateSubjectGrades(req, res) {
  const { id, year, period, updateData } = req.body
  try {
    // 1. Validar estructura
    const validYears = ['year1', 'year2', 'year3', 'year4', 'year5']
    const validPeriods = ['period1', 'period2', 'period3']

    if (!validYears.includes(year)) {
      throw new Error(
        `Año inválido. Opciones válidas: ${validYears.join(', ')}`
      )
    }

    if (!validPeriods.includes(period)) {
      throw new Error(
        `Período inválido. Opciones válidas: ${validPeriods.join(', ')}`
      )
    }

    // 2. Construir objeto de actualización
    const updateObject = {}
    for (const [subject, grade] of Object.entries(updateData)) {
      const updatePath = `${year}.${period}.${subject}`
      updateObject[updatePath] = grade
    }

    // 3. Ejecutar actualización
    const updatedDoc = await NoteModel.findByIdAndUpdate(
      id,
      { $set: updateObject },
      {
        new: true,
        runValidators: true, // Valida las reglas del esquema
        context: 'query', // Necesario para validar correctamente
      }
    )

    if (!updatedDoc) {
      throw new Error('Registro académico no encontrado')
    }

    return res.status(200).json(updatedDoc)
  } catch (error) {
    console.error('Error actualizando calificaciones:', error)
    throw error // Propaga el error para manejo externo
  }
}
