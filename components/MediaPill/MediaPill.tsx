import Pill, { PillColor } from '../Pill/Pill';

export enum MediaPillType {
    'movie' = 'movie',
    'tv' = 'tv',
}

interface MediaPillProps {
    type: MediaPillType
}

const MediaPill: React.FC<MediaPillProps> = ({ type }) => {
    let mediaPillColor: PillColor
    switch (type) {
        case MediaPillType.movie:
            mediaPillColor = PillColor.blue
            break
        case MediaPillType.tv:
            mediaPillColor = PillColor.purple
            break            
    }   
    return <Pill text={type.toString()} color={mediaPillColor} isUppercase={true}/>
}

export default MediaPill