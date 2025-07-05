import {
    Container,
    Button,
    Title,
    Modal,
    NumberInput,
    TextInput,
    Stack,
    Menu,
    Group,
    Text,
    RingProgress,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useGoals } from './hooks/useGoals';
import { useCreateGoal } from './hooks/useCreateGoal';
import { useNavigate } from 'react-router-dom';

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

    const { mutate } = useCreateGoal();

    function handleSubmit() {
        mutate(form.getValues());
        close();
    }

    return (
        <Container mt={30}>
            <Stack align='flex-start' p={0}>
                <Title order={1}>Goals</Title>
                <Menu>
                    {data &&
                        data.map((goal: any) => (
                            <Menu.Item
                                key={goal.id}
                                onClick={() => navigate(`/${goal.id}`)}
                                style={{
                                    border: '1px solid black',
                                }}>
                                <Group justify='space-between'>
                                    <Text>{goal.name}</Text>
                                    <RingProgress
                                        roundCaps
                                        sections={[
                                            {
                                                value:
                                                    (goal.count / goal.goal) *
                                                    100,
                                                color: 'teal',
                                            },
                                        ]}
                                        size={40}
                                        thickness={8}
                                    />
                                </Group>
                            </Menu.Item>
                        ))}
                </Menu>
                <Button onClick={open} maw={200}>
                    + Add Goal
                </Button>
            </Stack>

            <Modal opened={opened} onClose={close} title='Add Goal'>
                <form onSubmit={form.onSubmit(values => console.log(values))}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label='Goal Name'
                            placeholder='New Goal'
                            key={form.key('name')}
                            {...form.getInputProps('name')}
                        />
                        <NumberInput
                            withAsterisk
                            label='Goal'
                            placeholder='21'
                            key={form.key('goal')}
                            {...form.getInputProps('goal')}
                        />
                        <NumberInput
                            withAsterisk
                            label='Count'
                            placeholder='0'
                            key={form.key('count')}
                            {...form.getInputProps('count')}
                        />
                        <Button type='submit' onClick={handleSubmit} maw={200}>
                            Add
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </Container>
    );
};

export default App;
