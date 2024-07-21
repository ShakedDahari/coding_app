import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';

export default function CodePage() {

    const { chosenCodeBlock } = useContext(ContextPage);

  return (
    <div>
        <div>
            <h1>{chosenCodeBlock.title}</h1>
        </div>
    </div>
  )
}
