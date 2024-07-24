import React, { useContext } from 'react';
import { ContextPage } from '../Context/ContextProvider';
import BlockItem from './BlockItem';

export default function CodeBlocks() {

    const { codeBlocks } = useContext(ContextPage);

    let codeBlocksOutput = codeBlocks.map(block => <BlockItem key={block._id} id={block._id} name={block.name} intro={block.intro} initialCode={block.initialCode} solution={block.solution}/>);

  return (
    <div>
        {codeBlocksOutput}
    </div>
  )
}
