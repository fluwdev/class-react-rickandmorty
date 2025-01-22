import CharacterList from '@/components/character-list'
import { APIHandler, RickAndMortyStore } from './classes'

const App = () => {
  const api = new APIHandler('https://rickandmortyapi.com/api')
  const store = new RickAndMortyStore(api)

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold py-10'>Rick and Morty Characters</h1>
      <CharacterList store={store} />
    </div>
  )
}

export default App
