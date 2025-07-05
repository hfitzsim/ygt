import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGoal } from '../services/goals.ts';

export function useDeleteGoal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteGoal,
        onSuccess: () => {
            // optionally refetch the goals list
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
}
