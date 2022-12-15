import  React, { useRef, FC, RefObject } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';

import { TCard, TChildren } from '../../utils/types'

import constructorStyles from './burger-constructor.module.css';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { setCardMove } from '../../services/actions/move-item';

import { TDragCard } from '../../utils/types'

export const DragCard: FC<TDragCard> = ({ item, index, deleteItem }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'itemConstructor',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'itemConstructor',
    hover: (item: {index: number}, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (!ref.current || dragIndex === hoverIndex) {
        return;
      }

      // Перемещает вверх или вниз, когда курсор мыши выходит за среднюю ось Y элемента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      // Перетаскивание продолжается только если hover меньше middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      //  hover больше middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      dispatch(setCardMove(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  // Объединяет два рефа в один (drag and drop)
  const ref = useRef<HTMLLIElement>(null);
  dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <li
      className={constructorStyles.constructor__item}
      ref={ref}
      style={{ opacity }}
      onClick={(e) => deleteItem(e, item._id)}
    >
      <DragIcon type='primary' />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
    </li>
  );
};


