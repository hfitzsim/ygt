import { useQuery } from '@tanstack/react-query';
import { fetchAllGoals } from '../services/goals';
import { useUser } from '../context/UserContext';

const useGoals = () => {
    const { user } = useUser();

    return useQuery({
        queryKey: ['goals', user?.id],
        queryFn: () => fetchAllGoals(user?.id ?? ''),
        enabled: !!user?.id,
    });
};

export { useGoals };
