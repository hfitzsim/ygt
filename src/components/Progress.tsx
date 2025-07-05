import {
    Stack,
    Container,
    Button,
    RingProgress,
    Text,
    Group,
    Title,
} from '@mantine/core';
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
        <Container mt={30}>
            <Button onClick={() => navigate('/')} w={100} variant='transparent'>
                {`< Back`}
            </Button>
            <Stack align='center'>
                <Title order={2}>{goal?.name}</Title>
                <RingProgress
                    roundCaps
                    size={280}
                    thickness={20}
                    sections={[
                        {
                            value: (goal?.count / goal?.goal) * 100,
                            color: 'teal',
                        },
                    ]}
                    label={
                        <Text c='jet' fw={200} ta='center' size='md'>
                            {goal?.count} / {goal?.goal} days
                        </Text>
                    }
                />{' '}
                <Group>
                    <Button
                        onClick={handleDecrementProgress}
                        maw={200}
                        variant='outline'>
                        - Remove Progress
                    </Button>

                    <Button onClick={handleIncrementProgress} maw={200}>
                        + Add Progress
                    </Button>
                </Group>
            </Stack>
        </Container>
    );
};

export default Progress;
