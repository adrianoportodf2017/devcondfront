import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://agenciatecnet.com.br" target="_blank" rel="noopener noreferrer">Agência TecNet</a>
        <span className="ml-1">&copy; 2024 .</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">Agencia TecNet</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
