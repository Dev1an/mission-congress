const contentfulManagement = require("contentful-management")
const space = '8rnyu3a47f59'
const environment = 'master'
const fs = require('fs')

const accessToken = fs.readFileSync('../contentful/management-token.txt', 'utf8')

module.exports = function() {
  const contentfulClient = contentfulManagement.createClient({
    accessToken
  })

  return contentfulClient
    .getSpace(space)
    .then(space => space.getEnvironment(environment))
}