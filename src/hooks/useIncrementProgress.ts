import { useMutation, useQueryClient } from '@tanstack/react-query';
import { incrementProgress } from '../services/goals.ts';

const useIncrementProgress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => incrementProgress(id),
        onSuccess: (_, id) => {
            // Optionally refetch goal and/or list of goals
            queryClient.invalidateQueries({ queryKey: ['goal', id] });
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
};

export { useIncrementProgress };
