import { useQuery } from '@tanstack/react-query';
import { fetchAllGoals } from '../services/goals';

const useGoals = () => {
    return useQuery({
        queryKey: ['goals'],
        queryFn: fetchAllGoals,
    });
};

export { useGoals };
