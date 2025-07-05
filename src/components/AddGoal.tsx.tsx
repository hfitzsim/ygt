import { Modal, Button, Stack, TextInput, NumberInput } from '@mantine/core';
import type React from 'react';

interface AddGoalProps {
    opened: boolean;
    close: () => void;
    form: any;
    handleSubmit: () => void;
}

const AddGoal: React.FC<AddGoalProps> = ({
    opened,
    close,
    form,
    handleSubmit,
}) => {
    return (
        <Modal opened={opened} onClose={close} title='Add Goal'>
            <form>
                <Stack>
                    <TextInput
                        withAsterisk
                        label='Goal Name'
                        placeholder='Ex. drink 64 oz of water per day'
                        key={form.key('name')}
                        {...form.getInputProps('name')}
                    />
                    <NumberInput
                        withAsterisk
                        label='Goal'
                        description='A numeric representation of your goal, e.g. 21 (days)'
                        key={form.key('goal')}
                        {...form.getInputProps('goal')}
                    />
                    <NumberInput
                        withAsterisk
                        label='Count'
                        description='Completed progress towards your goal'
                        placeholder='0'
                        key={form.key('count')}
                        {...form.getInputProps('count')}
                    />
                    <Button type='submit' onClick={handleSubmit}>
                        Add Goal
                    </Button>
                </Stack>
            </form>
        </Modal>
    );
};

export { AddGoal };
