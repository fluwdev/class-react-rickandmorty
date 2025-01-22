import { CharacterAttributes } from '..'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const CharacterCard = ({ character }: { character: CharacterAttributes }) => {
  return (
    <Card className='hover:scale-110 transition-transform duration-300 ease-in-out'>
      <CardHeader className='flex items-center justify-between'>
        <img src={character.image} className='w-20 h-20 rounded-full' />
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <h4 className='w-[100%] font-bold text-xl'>{character.name}</h4>
        <p className='truncate text-sm'>
          <div
            className='size-2 rounded-full inline-block mr-2'
            style={{
              backgroundColor:
                character.species.toLowerCase() === 'human'
                  ? '#00ff00'
                  : character.species.toLowerCase() === 'Unknown'
                  ? '#ff0000'
                  : '#0000ff',
            }}
          ></div>
          <span className='opacity-80'>
            {' '}
            {character.status} - {character.species}
          </span>
        </p>
        <div className='flex flex-col'>
          <span className='opacity-80 font-medium text-base'>
            Last known location:
          </span>
          <span>{character?.location?.name}</span>
        </div>
        <div className='flex flex-col'>
          <span className='opacity-80 font-medium text-base'>Origin</span>
          <span>{character?.origin?.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
