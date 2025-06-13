export type Student = {
  _id: string
  names: string
  lastnames: string
  ci: string
  currentSession: string
  currentCourse: number
  birthday: string
  placeOfBirth: string
  photo: Blob
  email: string
  namesParent: string
  lastnamesParent: string
  ciParent: string
  address: string
  gender: string
}

export type StudentWithForm = Omit<Student, 'id'>

export type Period = {
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

export type Periods = {
  period1: Period
  period2: Period
  period3: Period
}

export type Notes = {
  _id: string
  idStudent: string
  year1: Periods
  year2: Periods
  year3: Periods
  year4: Periods
  year5: Periods
}
