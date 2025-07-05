import { useMutation, useQueryClient } from '@tanstack/react-query';
import { decrementProgress } from '../services/goals.ts';

const useDecrementProgress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => decrementProgress(id),
        onSuccess: (_, id) => {
            // Optionally refetch goal and/or list of goals
            queryClient.invalidateQueries({ queryKey: ['goal', id] });
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
};

export { useDecrementProgress };
