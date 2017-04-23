
const isAdminOrSelf = ({ authToken }, { id }) => {
  const { id: verifiedId, isAdmin } = authToken
  if (!isAdmin && verifiedId !== id) {
    throw new Error('Unauthorized')
  }
}

const defaultResolveFn = (source, args, { fieldName }) => {
  const property = source[fieldName]
  return typeof property === 'function' ? property.call(source) : property
}


function resolveForAdmin(source, args, context) {
  return (context.user && context.user.isAdmin)
    ? defaultResolveFn.apply(this, arguments)
    : null
}

module.exports = {
  isAdminOrSelf,
  resolveForAdmin
}
