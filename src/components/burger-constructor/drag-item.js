import { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useDrag, useDrop } from 'react-dnd';

import constructorStyles from './burger-constructor.module.css';

import { setCardMove } from '../../services/actions/move-item';

import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const DragCard = ({ item, index, moveItem, deleteItem }) => {
  const dispatch = useDispatch();

  const { dataOrder, ingredientsMove } = useSelector((store) => ({
    dataOrder: store.burgerConstructor.dataOrder,
    ingredientsMove: store.moveItem.ingredientsMove,
  }));
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      if (!ref.current || item.card) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Перемещает вверх или вниз, когда курсор мыши выходит за среднюю ось Y элемента
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      // Перетаскивание продолжается только если hover меньше middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      //  hover больше middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      dispatch(
        setCardMove(
          dragIndex,
          hoverIndex,
          dataOrder.ingredients,
          ingredientsMove
        )
      );
      // moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Объединяет два рефа в один (drag and drop)
  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <li
      className={constructorStyles.constructor__item}
      ref={dragDropRef}
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
