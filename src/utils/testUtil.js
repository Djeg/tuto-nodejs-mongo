export const authenticateUser = async ({ email, password, app }) => {
  await app.inject({
    method: 'POST',
    url: '/users',
    payload: { email, password },
  })

  const tokenResponse = await app.inject({
    method: 'POST',
    url: '/authenticate',
    payload: { email, password },
  })

  const { token } = await tokenResponse.json()

  return token
}
