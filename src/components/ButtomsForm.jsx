/* Botones para decidir si verificar o registrar las propuestas */
import React, { useContext } from 'react'
import { ProposalContext } from '../hooks/ProposalContext'


const ButtomsForm = () => {
    const [selectCall, call, loadProposals, proposals, removeProposal, registerProposals, verifyProposals] = useContext(ProposalContext)

  return (
    <div className='flex justify-center'>
        <div className='flex justify-between w-1/2 mt-10 mb-10'>
        <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/3 h-10 text-white font-mono text-lg cursor-pointer" onClick={registerProposals}>
                Register
        </button>
        <button type="button" className="bg-slate-700 hover:bg-slate-600 rounded-md w-1/3 h-10 text-white font-mono text-lg cursor-pointer" onClick={verifyProposals}>
                Verify
        </button>
        </div>
    </div>
  )
}

export default ButtomsForm