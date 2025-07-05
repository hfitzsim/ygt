import {
    Container,
    Button,
    Title,
    Stack,
    Menu,
    Group,
    Text,
    RingProgress,
} from '@mantine/core';
import { AddGoal } from './components/AddGoal.tsx';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useGoals } from './hooks/useGoals';
import { useCreateGoal } from './hooks/useCreateGoal';
import { useDeleteGoal } from './hooks/useDeleteGoal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faPlus,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

const App = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: '',
            goal: 0,
            count: 0,
        },
    });

    const { data } = useGoals();
    const { mutate: addGoal } = useCreateGoal();
    const { mutate: removeGoal } = useDeleteGoal();

    function handleSubmit() {
        addGoal(form.getValues());
        close();
    }

    function handleDeleteGoal(id: string) {
        removeGoal(id);
    }

    return (
        <Container mt={30}>
            <Stack align='flex-start' p={0}>
                <Group justify='space-between' w='100%'>
                    <Title order={1}>Goals</Title>

                    <Button
                        onClick={open}
                        maw={200}
                        leftSection={<FontAwesomeIcon icon={faPlus} />}>
                        Add Goal
                    </Button>
                </Group>
                <Menu>
                    {data &&
                        data.map((goal: any) => (
                            <Menu.Item
                                key={goal.id}
                                style={{
                                    border: '1px solid black',
                                }}
                                rightSection={
                                    <Menu>
                                        <Menu.Target>
                                            <FontAwesomeIcon
                                                icon={faEllipsisVertical}
                                            />
                                        </Menu.Target>
                                        <Menu.Dropdown>
                                            <Menu.Item
                                                color='red'
                                                onClick={() =>
                                                    handleDeleteGoal(goal.id)
                                                }
                                                leftSection={
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                }>
                                                Delete Goal
                                            </Menu.Item>
                                        </Menu.Dropdown>
                                    </Menu>
                                }>
                                <Group
                                    justify='space-between'
                                    onClick={() => navigate(`/${goal.id}`)}>
                                    <Text>{goal.name}</Text>
                                    <RingProgress
                                        roundCaps
                                        sections={[
                                            {
                                                value:
                                                    (goal.count / goal.goal) *
                                                    100,
                                                color:
                                                    goal.count === 0
                                                        ? 'grey'
                                                        : 'teal',
                                            },
                                        ]}
                                        size={40}
                                        thickness={8}
                                    />
                                </Group>
                            </Menu.Item>
                        ))}
                </Menu>
            </Stack>

            <AddGoal
                opened={opened}
                close={close}
                form={form}
                handleSubmit={handleSubmit}
            />
        </Container>
    );
};

export default App;
