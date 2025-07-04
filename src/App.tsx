import { Container, Button, Title, Modal, NumberInput, TextInput, Stack, Menu } from '@mantine/core';
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

    const { mutate, isPending, error } = useCreateGoal();

    function handleSubmit() {
        mutate(form.getValues());
        close();
    }

    return (
        <Container>
            <Stack>
                <Title order={1}>Goals</Title>
                <Menu>
                    {data &&
                        data.map((goal: any) => (
                            <Menu.Item key={goal.id} onClick={() => navigate(`/${goal.id}`)}>
                                {goal.name}
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
                            placeholder='day in the gym'
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
