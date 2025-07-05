import { useState } from 'react';
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
import { EditGoal } from './components/EditGoal.tsx';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useGoals } from './hooks/useGoals';
import { useCreateGoal } from './hooks/useCreateGoal';
import { useEditGoal } from './hooks/useEditGoal';
import { useDeleteGoal } from './hooks/useDeleteGoal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faPlus,
    faTrash,
    faPencil,
} from '@fortawesome/free-solid-svg-icons';
import type { Goal } from './types.ts';

const App = () => {
    const { data } = useGoals();
    const navigate = useNavigate();

    const [opened, { open, close }] = useDisclosure(false);
    const [editOpened, setEditOpened] = useState(false);

    const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

    const addForm = useForm({
        initialValues: {
            name: '',
            goal: 0,
            count: 0,
        },
    });

    const editForm = useForm({
        initialValues: {
            id: '',
            name: '',
            goal: 0,
        },
    });

    const { mutate: addGoal } = useCreateGoal();
    const { mutate: editGoal } = useEditGoal();
    const { mutate: removeGoal } = useDeleteGoal();

    function handleSubmitAddGoal() {
        addGoal(addForm.getValues());
        close();
    }

    function handleSubmitEditGoal() {
        editGoal(editForm.getValues());
        setEditOpened(false);
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
                        data
                            .sort((a: Goal, b: Goal) =>
                                a.name.localeCompare(b.name),
                            )
                            .map((goal: Goal) => (
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
                                                    onClick={() => {
                                                        setSelectedGoal(goal);
                                                        editForm.setValues({
                                                            id: goal.id,
                                                            name: goal.name,
                                                            goal: goal.count,
                                                        });
                                                        setEditOpened(true);
                                                    }}
                                                    leftSection={
                                                        <FontAwesomeIcon
                                                            icon={faPencil}
                                                        />
                                                    }>
                                                    Edit Goal
                                                </Menu.Item>
                                                <Menu.Item
                                                    color='red'
                                                    onClick={() =>
                                                        handleDeleteGoal(
                                                            goal.id,
                                                        )
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
                                                        (goal.count /
                                                            goal.goal) *
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
                form={addForm}
                handleSubmit={handleSubmitAddGoal}
            />

            <EditGoal
                opened={editOpened}
                close={() => setEditOpened(false)}
                form={editForm}
                handleSubmit={handleSubmitEditGoal}
            />
        </Container>
    );
};

export default App;
