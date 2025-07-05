import { Modal, NumberInput, Button } from '@mantine/core';

interface SetProgressCountProps {
    opened: boolean;
    close: () => void;
    field: any;
    handleSubmit: () => void;
}

const SetProgressCount: React.FC<SetProgressCountProps> = ({
    opened,
    close,
    field,
    handleSubmit,
}) => {
    return (
        <Modal opened={opened} onClose={close} title='Set Progress'>
            <NumberInput
                withAsterisk
                label='Count'
                min={0}
                {...field.getInputProps()}
            />
            <Button mt='md' w='100%' onClick={handleSubmit}>
                Submit
            </Button>
        </Modal>
    );
};

export { SetProgressCount };
