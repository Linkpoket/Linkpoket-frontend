import { MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';

export const useDragAndDropSensors = () => {
  return useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    })
  );
};
