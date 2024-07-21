import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function BlockItem(props) {

    //const { codeBlocks } = useContext(ContextPage);

  return (
    <div>
        <p> {props.title} </p>
    </div>
  )
}
