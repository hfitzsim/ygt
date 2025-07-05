import { useQuery } from '@tanstack/react-query';
import { fetchGoalById } from '../services/goals.ts';

const useGoalById = (id: string) => {
    return useQuery({
        queryKey: ['goal', id],
        queryFn: () => fetchGoalById(id),
        enabled: !!id,
    });
};

export { useGoalById };
