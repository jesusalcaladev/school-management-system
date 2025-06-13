import AdminModel from '../models/admin.js'

export const resetPassword = async (data) => {
  const { email, passwordHash } = data
  const user = await AdminModel.findOne({ email })
  if (!user) throw new Error('Admin no encontrado')
  const updatedUser = await AdminModel.findOneAndUpdate(
    { email: user.email },
    { $set: { password: passwordHash } },
    { new: true }
  )
  return updatedUser
}
