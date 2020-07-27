import React from "react";
import classNames from 'classnames'

import './Navbar.scss'

import removableIcon from '../../../assets/icons/removeIcon.svg'

import {Badge} from "../../Badge/Badge";
import {api} from "../../../api/api";

export const List = ({items, onClick, isRemovable, onRemoveList}) => {

	const onRemove = (item) => {
		if (window.confirm('Вы действительно хотите удалить список?')) {
			api.deleteList(item.id)
				.then(res => onRemoveList(item))
		}
	}


	return (
		<ul className='navbar__list list-navbar'>
			{items.map((i, index) => {
				return (
					<li key={index}
							className={classNames(i.className, {active: i.active})}
							onClick={onClick}>
						<i>
							{i.icon ? i.icon : <Badge color={i.color.name}/>}
						</i>
						<span>{i.name}</span>

						<div className='list-navbar__count'>
							{i.tasks && `(${i.tasks.length})`}
						</div>
						{isRemovable && <img src={removableIcon}
																 className='list-navbar__btn-remove'
																 onClick={() => onRemove(i)}
																 alt="remove"/>}
					</li>
				)
			})}
		</ul>
	)
}

