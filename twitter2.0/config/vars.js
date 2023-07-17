import dotenv from 'dotenv'

dotenv.config()

const TICKETMASTER_API = `https://app.ticketmaster.com/discovery/v2/events.json?size=200&countryCode=US&apikey=${process.env.TICKETMASTER_APIKEY}`

export default {TICKETMASTER_API}