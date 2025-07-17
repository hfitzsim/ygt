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
    Checkbox,
    ActionIcon,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { AddGoal } from './components/AddGoal.tsx';
import { EditGoal } from './components/EditGoal.tsx';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useGoals } from './hooks/useGoals';
import { useCreateGoal } from './hooks/useCreateGoal';
import { useEditGoal } from './hooks/useEditGoal';
import { useDeleteGoal } from './hooks/useDeleteGoal';
import { useSetProgress } from './hooks/useSetProgress';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faPlus,
    faTrash,
    faPencil,
    faRotateLeft,
    faDumpster,
} from '@fortawesome/free-solid-svg-icons';
import type { Goal } from './types.ts';

const App = () => {
    const { data } = useGoals();
    const navigate = useNavigate();

    const [opened, { open, close }] = useDisclosure(false);
    const [editOpened, setEditOpened] = useState(false);
    const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);

    const addForm = useForm({
        initialValues: {
            name: '',
            goal: 0,
            count: 0,
        },
        validate: {
            name: value => (value.length > 0 ? null : 'Name is required'),
            goal: value => (value > 0 ? null : 'Goal is required'),
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
    const { mutate: setProgress } = useSetProgress();

    function handleSubmitAddGoal() {
        addGoal(addForm.getValues());
        addForm.reset();
        close();
    }

    function handleSubmitEditGoal() {
        editGoal(editForm.getValues());
        editForm.reset();
        setEditOpened(false);
    }

    function handleDeleteGoal(id: string) {
        removeGoal(id);
    }

    function handleResetSelectedGoals() {
        selectedGoals.forEach(goal => {
            setProgress({ id: goal.id, newCount: 0 });
        });
        setSelectedGoals([]);
    }

    function handleDeleteSelectedGoals() {
        selectedGoals.forEach(goal => {
            removeGoal(goal.id);
        });
        setSelectedGoals([]);
    }

    return (
        <Container mt={30}>
            <Stack align='flex-start' p={0}>
                <Group justify='space-between' w='100%'>
                    <Title order={1}>Goals</Title>
                    <Group gap='xs'>
                        <Button
                            onClick={open}
                            maw={200}
                            leftSection={<FontAwesomeIcon icon={faPlus} />}
                            size='xs'>
                            Add Goal
                        </Button>
                        {selectedGoals.length > 0 && (
                            <>
                                <Button
                                    color='orange'
                                    variant='outline'
                                    disabled={data?.length === 0}
                                    size='xs'
                                    leftSection={
                                        <FontAwesomeIcon icon={faRotateLeft} />
                                    }
                                    onClick={() =>
                                        modals.openConfirmModal({
                                            title: 'User beware!',
                                            children: (
                                                <Text size='sm'>
                                                    This action will reset
                                                    progress for all selected
                                                    goals to 0 (zero). Are you
                                                    sure you want to continue?
                                                </Text>
                                            ),
                                            labels: {
                                                confirm: 'Confirm',
                                                cancel: 'Cancel',
                                            },
                                            onConfirm: () =>
                                                handleResetSelectedGoals(),
                                        })
                                    }>
                                    Reset Goal
                                    {selectedGoals.length > 1 ? 's' : ''}
                                </Button>
                                <Button
                                    color='red'
                                    variant='outline'
                                    disabled={data?.length === 0}
                                    size='xs'
                                    leftSection={
                                        <FontAwesomeIcon icon={faDumpster} />
                                    }
                                    onClick={() =>
                                        modals.openConfirmModal({
                                            title: 'User beware!',
                                            children: (
                                                <Text size='sm'>
                                                    This action will permanently
                                                    delete all your selected
                                                    goals!! Are you sure you
                                                    want to continue?
                                                </Text>
                                            ),
                                            labels: {
                                                confirm: 'Confirm',
                                                cancel: 'Cancel',
                                            },
                                            onConfirm: () =>
                                                handleDeleteSelectedGoals(),
                                        })
                                    }>
                                    Delete Goal
                                    {selectedGoals.length > 1 ? 's' : ''}
                                </Button>
                            </>
                        )}
                    </Group>
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
                                    leftSection={
                                        <Checkbox
                                            checked={selectedGoals.includes(
                                                goal,
                                            )}
                                            onChange={() =>
                                                selectedGoals.includes(goal)
                                                    ? setSelectedGoals(
                                                          selectedGoals.filter(
                                                              g =>
                                                                  g.id !==
                                                                  goal.id,
                                                          ),
                                                      )
                                                    : setSelectedGoals([
                                                          ...selectedGoals,
                                                          goal,
                                                      ])
                                            }
                                        />
                                    }
                                    rightSection={
                                        <Menu>
                                            <Menu.Target>
                                                <ActionIcon
                                                    w={20}
                                                    mr={0}
                                                    pr={0}
                                                    variant='transparent'>
                                                    <FontAwesomeIcon
                                                        icon={
                                                            faEllipsisVertical
                                                        }
                                                    />
                                                </ActionIcon>
                                            </Menu.Target>

                                            <Menu.Dropdown>
                                                <Menu.Item
                                                    onClick={() => {
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
                                                        modals.openConfirmModal(
                                                            {
                                                                title: 'User beware!',
                                                                children: (
                                                                    <Text size='sm'>
                                                                        This
                                                                        action
                                                                        will
                                                                        permanently
                                                                        delete
                                                                        this
                                                                        goal!!
                                                                        Are you
                                                                        sure you
                                                                        want to
                                                                        continue?
                                                                    </Text>
                                                                ),
                                                                labels: {
                                                                    confirm:
                                                                        'Confirm',
                                                                    cancel: 'Cancel',
                                                                },
                                                                onConfirm: () =>
                                                                    handleDeleteGoal(
                                                                        goal.id,
                                                                    ),
                                                            },
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
                                        onClick={() =>
                                            navigate(`/ygt/${goal.id}`)
                                        }>
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
