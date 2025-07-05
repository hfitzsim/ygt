import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setProgress } from '../services/goals.ts';

const useSetProgress = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: { id: string; newCount: number }) =>
            setProgress(variables.id, variables.newCount),
        onSuccess: (_, obj) => {
            // Optionally refetch goal and/or list of goals
            queryClient.invalidateQueries({ queryKey: ['goal', obj.id] });
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
};

export { useSetProgress };
