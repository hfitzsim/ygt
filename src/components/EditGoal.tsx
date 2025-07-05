import { Modal, Button, Stack, TextInput, NumberInput } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';

interface EditGoalProps {
    opened: boolean;
    close: () => void;
    form: UseFormReturnType<any>;
    handleSubmit: () => void;
}

const EditGoal: React.FC<EditGoalProps> = ({
    opened,
    close,
    form,
    handleSubmit,
}) => {
    return (
        <Modal opened={opened} onClose={close} title='Edit Goal'>
            <Stack>
                <TextInput
                    withAsterisk
                    label='Goal Name'
                    {...form.getInputProps('name')}
                    key={form.key('name')}
                />
                <NumberInput
                    withAsterisk
                    label='Goal'
                    {...form.getInputProps('goal')}
                    key={form.key('goal')}
                />
                <Button mt='md' w='100%' onClick={handleSubmit}>
                    Submit
                </Button>
            </Stack>
        </Modal>
    );
};

export { EditGoal };
