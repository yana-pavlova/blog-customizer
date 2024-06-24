import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
  component: ArrowButton,
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const ArrowButtonStory: Story = {
  render: () => {
    // функция для обработки клика, чтобы передать ее в качестве пропса toggleForm
    const handleClick = () => {
      console.log('Arrow button clicked');
    };

	const isOpen = false;
	const ref = { current: null };

    return (
      <>
        <ArrowButton toggleForm={handleClick} formIsOpened={isOpen} ref={ref}/>
      </>
    );
  },
};
