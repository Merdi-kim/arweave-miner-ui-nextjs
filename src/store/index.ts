import { atom } from "recoil";
import { PrometheusMetrics} from '@/types'

export const metrics = atom({
    key: 'metrics',
    default: [] as Array<Object>
})