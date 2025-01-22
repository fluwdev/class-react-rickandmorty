import { CharacterAttributes, ResponseAPI } from '.'

export class APIHandler {
  baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async fetchData(endpoint: string): Promise<ResponseAPI> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching data:', error)
      return {
        info: { count: 0, next: null, previous: null },
        results: [],
      }
    }
  }
}

export class Character {
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

  constructor({
    id,
    name,
    image,
    status,
    species,
    created,
    episode,
    gender,
    location,
    origin,
    type,
    url,
  }: CharacterAttributes) {
    this.id = id
    this.name = name
    this.image = image ?? ''
    this.status = status
    this.species = species
    this.created = created ?? ''
    this.episode = episode ?? []
    this.gender = gender ?? ''
    this.location = location ?? {
      name: '',
      url: '',
    }
    this.origin = origin ?? {
      name: '',
      url: '',
    }
    this.type = type ?? ''
    this.url = url ?? ''
  }

  render(): CharacterAttributes {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      status: this.status,
      species: this.species,
      created: this.created,
      episode: this.episode,
      gender: this.gender,
      location: this.location,
      origin: this.origin,
      type: this.type,
      url: this.url,
    }
  }
}

class HumanCharacter extends Character {
  constructor(data: CharacterAttributes) {
    super(data)
  }

  render(): CharacterAttributes {
    const baseRender = super.render()
    return { ...baseRender, type: 'Human' }
  }
}

class AlienCharacter extends Character {
  constructor(data: CharacterAttributes) {
    super(data)
  }

  render(): CharacterAttributes {
    const baseRender = super.render()
    return { ...baseRender, type: 'Alien' }
  }
}

export class RickAndMortyStore {
  apiHandler: APIHandler
  characters: Character[]
  nextPage: number | null

  constructor(apiHandler: APIHandler) {
    this.apiHandler = apiHandler
    this.characters = []
    this.nextPage = 1
  }

  async loadCharacters(): Promise<Character[]> {
    if (!this.nextPage) return []

    const data = await this.apiHandler.fetchData(
      `/character?page=${this.nextPage}`
    )
    this.nextPage = data.info.next ? this.nextPage + 1 : null

    const newCharacters = data.results.map((char) =>
      char.species === 'Human'
        ? new HumanCharacter(char)
        : new AlienCharacter(char)
    )

    this.characters.push(...newCharacters)
    return newCharacters
  }
}
