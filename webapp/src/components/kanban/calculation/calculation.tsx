// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react'

import {Card} from '../../../blocks/card'
import Button from '../../../widgets/buttons/button'
import './calculation.scss'
import {IPropertyTemplate} from '../../../blocks/board'

import {KanbanCalculationOptions} from './calculationOptions'

type Props = {
    cards: Card[]
    cardProperties: IPropertyTemplate[]
    menuOpen: boolean
    property: IPropertyTemplate
    onMenuClose: () => void
    onMenuOpen: () => void
    calculation: string
}

export default function KanbanCalculation(props: Props): JSX.Element {
    return (
        <React.Fragment>
            <Button
                className='KanbanCalculation'
                onClick={() => {
                    if (props.menuOpen) {
                        props.onMenuClose()
                    } else {
                        props.onMenuOpen()
                    }
                }}
                onBlur={props.onMenuClose}
            >
                {`${props.cards.length + 10}`}
            </Button>

            {
                props.menuOpen && (
                    <KanbanCalculationOptions
                        menuOpen={props.menuOpen}
                        value={props.calculation}
                        onChange={() => {
                            console.log('KanbanCalculation onChange called')
                        }}
                        property={props.property}
                        cardProperties={props.cardProperties}
                    />
                )
            }
        </React.Fragment>
    )
}