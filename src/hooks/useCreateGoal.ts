import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGoal } from '../services/goals.ts';
import { useUser } from '../context/UserContext';

type GoalInput = {
    name: string;
    goal: number;
    count: number;
    user_id: string;
};

const useCreateGoal = () => {
    const queryClient = useQueryClient();
    const { user } = useUser();

    return useMutation({
        mutationFn: (goal: GoalInput) => createGoal(goal, user?.id ?? ''),
        onSuccess: () => {
            // optionally refetch the goals list
            queryClient.invalidateQueries({
                queryKey: ['goals', user?.id],
            });
        },
    });
};

export { useCreateGoal };
