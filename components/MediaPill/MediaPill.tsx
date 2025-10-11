import Pill, { PillColor } from '../Pill/Pill';
import { MediaType } from '@/lib/types'

interface MediaPillProps {
    type: MediaType
}

const MediaPill: React.FC<MediaPillProps> = ({ type }) => {
    let mediaPillColor: PillColor
    switch (type) {
        case MediaType.movie:
            mediaPillColor = PillColor.blue
            break
        case MediaType.tv:
            mediaPillColor = PillColor.purple
            break
    }
    return <Pill text={type.toString()} color={mediaPillColor} isUppercase={true}/>
}

export default MediaPill
