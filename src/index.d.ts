export type CharacterAttributes = {
  id: number
  name: string
  status: string
  species: string
  type?: string
  gender?: string
  origin?: {
    name: string
    url: string
  }
  location?: {
    name: string
    url: string
  }
  image?: string
  episode?: string[]
  url?: string
  created?: string
}

export interface ResponseAPI {
  info: {
    count: number
    next: number | null
    previous: number | null
  }
  results: CharacterData[]
}
