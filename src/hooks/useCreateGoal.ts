import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal } from '../services/goals.ts';

export function useCreateGoal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createGoal,
        onSuccess: () => {
            // optionally refetch the goals list
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
}
