// UTILITY FUNCTIONS

const utils = {}

utils.formatSequelizeTimeToDate = seqTimeProp => {
  return new Date(seqTimeProp).toDateString()
}

utils.formatSequelizeTimeToTime = seqTimeProp => {
  return new Date(seqTimeProp).toLocaleTimeString('en-US')
}

module.exports = utils
