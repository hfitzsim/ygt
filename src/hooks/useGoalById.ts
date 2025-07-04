import { useQuery } from '@tanstack/react-query';
import { fetchGoalById } from '../services/goals.ts';

export function useGoalById(id: string) {
    return useQuery({
        queryKey: ['goal', id],
        queryFn: () => fetchGoalById(id),
        enabled: !!id,
    });
}
