import bcrypt from "bcryptjs";

let mockUsers: Array<{ id: string; email: string; password: string; name?: string; token?: string }> = []

export function addMockUser(user: { id: string; email: string; password: string; name?: string }) {
  mockUsers.push(user)
  console.log('Mock Storage: User added', { id: user.id, email: user.email })
  console.log('Mock Storage: Total users now:', mockUsers.length)
  return user
}

// mockUsers.push({
//   id: "1",
//   email: "gm.rejuan@asthait.com",
//   password: "123456", // Plain text for testing
//   name: "gilman"
// });

export function findMockUser(email: string) {
  console.log('Mock Storage: Looking for user with email:', email)
  console.log('Mock Storage: Available users:', mockUsers.map(u => u.email))
  const user = mockUsers.find(u => u.email === email)
  console.log('Mock Storage: Finding user', email, user ? 'Found' : 'Not found')
  return user
}

export function getAllMockUsers() {
  return [...mockUsers]
}

export function clearMockUsers() {
  mockUsers = []
  console.log('Mock Storage: All users cleared')
}