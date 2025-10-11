import Pill, { PillColor } from '../Pill/Pill';
import { statusMap } from '@/lib/maps'

interface StatusPillProps {
    status: number,
		downloadStatus?: string[]
}

const StatusPill: React.FC<StatusPillProps> = ({ status, downloadStatus = [] }) => {
		if (status === 3 && downloadStatus.length === 0) {
			return <Pill text={"Requested"} color={PillColor.purple} isUppercase={false} />
		}
    return <Pill text={statusMap[status]} color={PillColor.green} isUppercase={false} />
}

export default StatusPill
