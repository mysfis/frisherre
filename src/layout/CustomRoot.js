import React from 'react'
import { Root, presets,} from 'mui-layout';

export default function CustomRoot(props) {
  return (
    <Root config={presets.createStandardLayout()}>
      {props.children}
    </Root>
  )
}
