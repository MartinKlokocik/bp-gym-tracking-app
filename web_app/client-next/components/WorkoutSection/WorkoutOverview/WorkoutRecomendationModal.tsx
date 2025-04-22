import { useLazyQuery } from '@apollo/client'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from '@heroui/react'
import { ArrowDown } from 'lucide-react'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { GET_WEIGHT_RECOMMENDATION } from '../../../graphql/AiCallsConsts'

type WorkoutRecomendationModalProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  exerciseRecordId: string
}

export const WorkoutRecomendationModal = ({
  isOpen,
  onOpenChange,
  exerciseRecordId,
}: WorkoutRecomendationModalProps) => {
  const [getWeightRecommendation, { data, loading, error, refetch }] =
    useLazyQuery(GET_WEIGHT_RECOMMENDATION, {
      variables: { exerciseRecordId },
    })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [recommendationData, setRecommendationData] = useState<any>(null)

  useEffect(() => {
    if (data) {
      setRecommendationData(JSON.parse(data.getWeightRecommendation))
    }
  }, [data])

  const regenerateAiRecomendation = () => {
    refetch()
  }

  const getAdjustmentIcon = (adjustment: string) => {
    if (adjustment === 'increase') {
      return <ArrowUp className="text-green-400" size={18} />
    } else if (adjustment === 'decrease') {
      return <ArrowDown className="text-red-400" size={18} />
    }
    return null
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        className="h-auto overflow-y-auto"
        scrollBehavior="inside"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Weight Recommendation from AI
              </ModalHeader>

              <ModalBody>
                {loading ? (
                  <div className="flex justify-center">
                    <Spinner size="lg" />
                  </div>
                ) : error ? (
                  <div className="text-danger">Error: {error.message}</div>
                ) : recommendationData ? (
                  <div>
                    <div className="mb-6 p-4 bg-gray-800 rounded-lg text-sm">
                      <p>{recommendationData.strategy}</p>
                    </div>

                    <div className="space-y-4">
                      {Object.keys(recommendationData)
                        .filter(key => key !== 'strategy')
                        .map(setKey => {
                          const set = recommendationData[setKey]
                          return (
                            <div
                              key={setKey}
                              className="bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-all"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg capitalize">
                                  {setKey.replace('_', ' ')}
                                </h3>
                                <div className="flex items-center">
                                  {getAdjustmentIcon(set.adjustment)}
                                  <span className="text-xs ml-1 text-gray-400">
                                    {set.adjustment}
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-between mb-3">
                                <div className="text-center px-3 py-2 bg-gray-700 rounded-lg w-2/5">
                                  <p className="text-xs text-gray-400">
                                    WEIGHT
                                  </p>
                                  <p className="text-xl font-bold">
                                    {set.next_weight}{' '}
                                    <span className="text-sm">kg</span>
                                  </p>
                                </div>
                                <div className="text-center px-3 py-2 bg-gray-700 rounded-lg w-2/5">
                                  <p className="text-xs text-gray-400">REPS</p>
                                  <p className="text-xl font-bold">
                                    {set.next_reps}
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-gray-400 italic">
                                {set.reason}
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <p>No recommendation data available</p>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => getWeightRecommendation()}
                      isLoading={loading}
                      className="w-full md:w-auto"
                    >
                      Generate
                    </Button>
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="button"
                  color="primary"
                  onClick={regenerateAiRecomendation}
                  isLoading={loading}
                >
                  Regenerate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
