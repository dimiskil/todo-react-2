import React, {useState} from "react";

import './BodyTitile.scss'
import {CSSTransition, SwitchTransition} from "react-transition-group";

import {Input} from "../../InputComponent/Input";
import {ControlBox, ControlItem} from "../../ControlBox/ControlBox";

export const TitleBody = ({list, onUpdate}) => {
	const [editMode, setEditMode] = useState(false)
	const [inputValue, setInputValue] = useState(list.name)

	const handleChange = (e) => {
		e.preventDefault()
		onUpdate('list', list.id, {name: inputValue})
		setEditMode(!editMode)
	}

	return (
		<div className='body__title title-wrap'>
			<SwitchTransition mode='out-in'>
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-text'}>
					{editMode ?
						<form onSubmit={handleChange}>
							<Input
								placeholder={'Название списка'}
								text={list.name} type='text'
								value={inputValue}
								setValue={setInputValue}/>
						</form>
						:
						<h2
							style={{color: list.color ? list.color.hex : 'black'}}
							className='title-wrap__title'>
							{list.name}
						</h2>}
				</CSSTransition>
			</SwitchTransition>

			<SwitchTransition>
				<CSSTransition
					key={editMode}
					in={editMode}
					timeout={300}
					classNames={'fade-btn'}>
					{editMode
						?	<ControlBox>
							<ControlItem icon={<svg className="icon-check">
								<use xlinkHref="#icon-check"/>
							</svg>}
													 color={'#04DD5C'}
													 sendFunc={() => {
														 onUpdate('list', list.id, {name: inputValue})
														 setEditMode(!editMode)
													 }}/>

							<ControlItem icon={<svg className="icon-times">
								<use xlinkHref="#icon-times"/>
							</svg>}
													 color={'#EE0463'}
													 sendFunc={() => {
														 setEditMode(!editMode)
														 setInputValue(list.name)
													 }}/>
						</ControlBox>

						:	<ControlBox>
							{!list.hardCode && <ControlItem icon={<svg className="icon-pencil">
									<use xlinkHref="#icon-pencil"/>
								</svg>}
															 sendFunc={() => setEditMode(!editMode)}/>}

							<ControlItem icon={<svg className="icon-sort">
								<use xlinkHref="#icon-sort"/>
							</svg>}/>
						</ControlBox>
					}
				</CSSTransition>
			</SwitchTransition>


		</div>
	)
}
