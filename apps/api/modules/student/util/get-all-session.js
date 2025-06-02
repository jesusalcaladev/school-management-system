export const getAllSessions = async (students) => {
  const uniqueSessions = students.reduce((acc, curr) => {
    if (!acc.includes(curr.currentSession)) {
      acc.push(curr.currentSession)
    }
    return acc
  }, [])
  return uniqueSessions
}
