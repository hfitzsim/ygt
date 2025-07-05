import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editGoal } from '../services/goals.ts';

const useEditGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: editGoal,
        onSuccess: (_, obj) => {
            // Optionally refetch goal and/or list of goals
            queryClient.invalidateQueries({ queryKey: ['goal', obj.id] });
            queryClient.invalidateQueries({ queryKey: ['goals'] });
        },
    });
};

export { useEditGoal };
