import { Stack, Container, Button, RingProgress, Text, Group } from '@mantine/core';
import { useIncrementProgress } from '../hooks/useIncrementProgress.ts';
import { useDecrementProgress } from '../hooks/useDecrementProgres.ts';
import { useParams } from 'react-router-dom';
import { useGoalById } from '../hooks/useGoalById.ts';
import { useNavigate } from 'react-router-dom';

const Progress = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { data: goal } = useGoalById(id!);
    const { mutate: increment } = useIncrementProgress();
    const { mutate: decrement } = useDecrementProgress();

    const handleIncrementProgress = () => {
        increment(id!);
    };

    const handleDecrementProgress = () => {
        decrement(id!);
    };

    return (
        <Container>
            <Stack>
                <Button onClick={() => navigate('/')} w={100}>
                    {`< Back`}
                </Button>
                <Text>{goal?.name}</Text>
                <Group>
                    <Button onClick={handleDecrementProgress} maw={200}>
                        - Remove Progress
                    </Button>
                    <RingProgress
                        roundCaps
                        sections={[{ value: (goal?.count / goal?.goal) * 100, color: 'teal' }]}
                        label={
                            <Text c='jet' fw={200} ta='center' size='md'>
                                {goal?.count} / {goal?.goal} days
                            </Text>
                        }
                    />{' '}
                    <Button onClick={handleIncrementProgress} maw={200}>
                        + Add Progress
                    </Button>
                </Group>
            </Stack>
        </Container>
    );
};

export default Progress;
