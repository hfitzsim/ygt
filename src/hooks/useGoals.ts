import { useQuery } from '@tanstack/react-query';
import { fetchAllGoals } from '../services/goals';

export function useGoals() {
    return useQuery({
        queryKey: ['goals'],
        queryFn: fetchAllGoals,
    });
}
