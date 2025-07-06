import {
    Stack,
    Container,
    Button,
    RingProgress,
    Text,
    Group,
    Title,
    ActionIcon,
    Menu,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useField } from '@mantine/form';
import { useIncrementProgress } from '../hooks/useIncrementProgress.ts';
import { useDecrementProgress } from '../hooks/useDecrementProgres.ts';
import { useSetProgress } from '../hooks/useSetProgress.ts';
import { useParams } from 'react-router-dom';
import { useGoalById } from '../hooks/useGoalById.ts';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faMinus,
    faChevronLeft,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { SetProgressCount } from './SetProgressCount.tsx';
import { ProgressCalendar } from './Calendar.tsx';

const Progress = () => {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();
    const { data: goal } = useGoalById(id!);

    const [opened, { open, close }] = useDisclosure(false);

    const { mutate: increment } = useIncrementProgress();
    const { mutate: decrement } = useDecrementProgress();
    const { mutate: setProgress } = useSetProgress();

    const countField = useField({
        initialValue: goal?.count,
    });
    const handleIncrementProgress = () => {
        increment(id!);
    };

    const handleDecrementProgress = () => {
        decrement(id!);
    };

    const handleSetProgress = (id: string, count: number) => {
        setProgress({ id: id, newCount: count });
    };

    return (
        <Container mt={30}>
            <Button
                onClick={() => navigate('/ygt')}
                w={100}
                variant='transparent'
                leftSection={<FontAwesomeIcon icon={faChevronLeft} />}>
                Back
            </Button>
            <Stack align='center'>
                <Group>
                    <Title order={2}>{goal?.name}</Title>
                    <Menu>
                        <Menu.Target>
                            <ActionIcon variant='transparent'>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={open}>
                                Specify Progress
                            </Menu.Item>
                            <Menu.Item
                                color='red'
                                onClick={() => handleSetProgress(id!, 0)}>
                                Reset
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
                <Group>
                    <RingProgress
                        roundCaps
                        size={280}
                        thickness={20}
                        sections={[
                            {
                                value: (goal?.count / goal?.goal) * 100,
                                color: goal?.count === 0 ? 'grey' : 'teal',
                            },
                        ]}
                        label={
                            <Text c='jet' fw={200} ta='center' size='md'>
                                {goal?.count} / {goal?.goal} days
                            </Text>
                        }
                    />
                </Group>

                <Group>
                    <Button
                        onClick={handleDecrementProgress}
                        maw={200}
                        variant='outline'
                        leftSection={<FontAwesomeIcon icon={faMinus} />}
                        disabled={goal?.count === 0}>
                        Remove Progress
                    </Button>

                    <Button
                        onClick={handleIncrementProgress}
                        maw={200}
                        leftSection={<FontAwesomeIcon icon={faPlus} />}>
                        Add Progress
                    </Button>
                </Group>
            </Stack>

            <SetProgressCount
                opened={opened}
                close={close}
                field={countField}
                handleSubmit={() => {
                    handleSetProgress(id!, Number(countField.getValue()));
                    close();
                }}
            />
        </Container>
    );
};

export default Progress;
