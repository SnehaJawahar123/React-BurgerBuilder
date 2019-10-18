import React from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div> Toolbar, Side Drawer, Backdrop</div>
        <main className={classes.content}>
            {props.children}
        </main>
    </Aux>
)


export default layout