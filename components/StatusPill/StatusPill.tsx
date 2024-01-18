import Pill, { PillColor } from '../Pill/Pill';
import { statusMap } from '../../lib/maps'

interface StatusPillProps {
    status: number
}

const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
    return <Pill text={statusMap[status]} color={PillColor.green} isUppercase={false} />
}

export default StatusPill