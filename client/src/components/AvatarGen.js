import React from 'react'
import { Image, Button } from 'react-bootstrap'
import { Dropdown } from '@gympass/yoga'
import { colorPallet } from './Theme'

const AvatarGen = (props) => {
  // Generates a random string
  const stringGenerator = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz123456789'
    const max = characters.length - 1
    const min = 0
    let randomString = ''
    for (let i = min; i < max; i += 1) {
      randomString += characters[Math.ceil(Math.random() * (max - min) + min)]
    }
    return randomString
  }

  return (
    <div style={{ marginBottom: '22px' }}>
      <Image
        style={{ width: '9rem' }}
        src={`https://avatars.dicebear.com/api/${props.sprite}/${props.seed}.svg`}
        rounded
      />
      <Button onClick={(() => props.setSeed(stringGenerator()))}>Generate Avatar</Button>
      <Dropdown
        style={{ width: '100%', color: colorPallet.marvel }}
        label='Choose an Avatar Type'
        options={[
          { label: 'Feminine', value: 'female' },
          { label: 'Masculine', value: 'male' },
          { label: 'Random Human', value: 'human' },
          { label: 'Robot', value: 'bottts' },
          { label: 'Jdenticon', value: 'jdenticon' }
        ]}
        onChange={(choice) => props.setSprite(choice.value)}
      />
    </div>
  )
}
export default AvatarGen
