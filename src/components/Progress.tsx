import { Stack, Container, Button, RingProgress, Text } from '@mantine/core';
import { useIncrementProgress } from '../hooks/useIncrementProgress.ts';
import { useParams } from 'react-router-dom';
import { useGoalById } from '../hooks/useGoalById.ts';
import { useNavigate } from 'react-router-dom';

const Progress = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: goal } = useGoalById(id!);
    const { mutate, isPending, error } = useIncrementProgress();

    const handleIncrementProgress = () => {
        mutate(id!);
    };

    return (
        <Container>
            <Stack>
                <Button onClick={() => navigate('/')}>Back</Button>
                <Text>{goal?.name}</Text>
                <RingProgress
                    sections={[{ value: (goal?.count / goal?.goal) * 100, color: 'blue' }]}
                    label={
                        <Text c='blue' fw={200} ta='center' size='xl'>
                            {goal?.count} / {goal?.goal} days
                        </Text>
                    }
                />{' '}
                <Button onClick={handleIncrementProgress}>+ Add Progress</Button>
            </Stack>
        </Container>
    );
};

export default Progress;
