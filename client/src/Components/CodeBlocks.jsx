import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';
import BlockItem from './BlockItem';

export default function CodeBlocks() {

    const { codeBlocks } = useContext(ContextPage);

    let codeBlocksOutput = codeBlocks.map(block => <BlockItem key={block.id} id={block.id} title={block.title}/>);

  return (
    <div>
        {codeBlocksOutput}
    </div>
  )
}
