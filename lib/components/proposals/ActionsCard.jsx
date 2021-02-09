import { Button } from 'lib/components/Button'
import { Card } from 'lib/components/Card'
import { Action } from 'lib/components/proposals/Action'
import { useGovernorAlphaData } from 'lib/hooks/useGovernanceData'
import { usePrizePools } from 'lib/hooks/usePrizePools'
import React from 'react'

export const ActionsCard = (props) => {
  const { actions, setActions } = props
  const { isFetched: isPrizePoolsFetched } = usePrizePools()
  const { data: governorAlphaData, isFetched: isGovernorAlphaDataFetched } = useGovernorAlphaData()

  if (!isPrizePoolsFetched || !isGovernorAlphaDataFetched) return null

  const { proposalMaxOperations } = governorAlphaData

  return (
    <Card>
      <h4 className='mb-6'>Actions</h4>
      <p className='mb-4'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      {actions.map((action, index) => {
        const setAction = (action) => {
          const newActions = [...actions]
          newActions.splice(index, 1, action)
          setActions(newActions)
        }

        const deleteAction = () => {
          const newActions = [...actions]
          newActions.splice(index, 1)
          setActions(newActions)
        }
        return (
          <Action
            key={action.id}
            action={action}
            index={index}
            setAction={setAction}
            deleteAction={deleteAction}
          />
        )
      })}
      <Button
        className='mt-8'
        onClick={(e) => {
          e.preventDefault()
          setActions([
            ...actions,
            {
              id: Date.now()
            }
          ])
        }}
        disabled={actions.length >= proposalMaxOperations}
      >
        Add another action
      </Button>
    </Card>
  )
}
