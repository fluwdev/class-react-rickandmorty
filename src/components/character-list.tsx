import { useEffect, useState } from 'react'
import CharacterCard from '@/components/character-card'
import { RickAndMortyStore } from '@/classes'
import { CharacterAttributes } from '@/index'

const CharacterList = ({ store }: { store: RickAndMortyStore }) => {
  const [characters, setCharacters] = useState<CharacterAttributes[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMoreCharacters = async () => {
    if (loading) return
    setLoading(true)
    const newCharacters = await store.loadCharacters()
    const arrayCharacters = newCharacters.map((c) => c.render())
    setCharacters((prev) => [...prev, ...arrayCharacters])
    setLoading(false)
  }

  useEffect(() => {
    fetchMoreCharacters()
  }, [])

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        await fetchMoreCharacters()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [characters, loading])

  return (
    <div
      id='characters'
      className='w-full flex flex-row flex-wrap gap-4 items-center justify-center'
    >
      {characters.map((char, index) => (
        <CharacterCard key={index} character={char} />
      ))}
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default CharacterList
